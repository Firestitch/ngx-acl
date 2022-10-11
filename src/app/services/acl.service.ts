import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { AclEntry } from '../interfaces/acl-entry';
import { AclAccess } from '../enums/acl-access.enum';
import { AclRequire } from '../enums/acl-require.enum';
// import { FsAclCache } from './acl-cache.service';
import { AclComplexPermission } from '../interfaces/acl-complex-permission';
import { AclEntriesList } from '../interfaces/acl-entris-list';
import { transformEntriers } from '../helpers/transform-entriers';
import { generatePermissions } from '../helpers/generate-permissions';


@Injectable({
  providedIn: 'root',
})
export class FsAcl {

  private _entries = new BehaviorSubject<AclEntriesList>(new Map());

  public constructor(
    // private _cache: FsAclCache,
  ) {}

  public get entries$(): Observable<AclEntriesList> {
    return this._entries.asObservable();
  }

  public get entries(): AclEntriesList {
    return this._entries.getValue();
  }

  public setEntries(aclEntries: AclEntry[]) {
    // this._cache.clear();
    const entries = transformEntriers(aclEntries);

    this._entries.next(entries);
  }

  public clear() {
    this._entries.next(new Map());
  }

  public hasRead(permissions: string | (string | AclComplexPermission)[], object = null, require = AclRequire.Any) {
    return this.has(permissions, AclAccess.Read, object, require);
  }

  public hasWrite(permissions: string | (string | AclComplexPermission)[], object = null, require = AclRequire.Any) {
    return this.has(permissions, AclAccess.Write, object, require);
  }

  public hasFull(permissions: string | (string | AclComplexPermission)[], object = null, require = AclRequire.Any) {
    return this.has(permissions, AclAccess.Full, object, require);
  }

  public has(
    permissions: string | (string | AclComplexPermission)[],
    access?: AclAccess,
    objects?: number | number[],
    require = AclRequire.Any,
    aclEntries?: AclEntry[],
  ) {
    const entries = !!aclEntries
      ? transformEntriers(aclEntries)
      : this.entries;

    permissions = Array.isArray(permissions) ? permissions : [permissions];
    objects = typeof objects === 'number' ? [objects] : objects;

    const requestedPermissions: AclComplexPermission[] = permissions
      .reduce((acc, permission) => {
        if (typeof permission === 'string') {
          acc.push(...generatePermissions(permission, objects as any));
        } else {
          acc.push(permission);
        }

        return acc;
      }, []);


    if (require === AclRequire.Any) {
      return requestedPermissions.some((permission) => {
        return this._weightPermissions(entries, permission, access);
      });
    } else {
      return requestedPermissions.every((permission) => {
        return this._weightPermissions(entries, permission, access);
      });
    }
  }

  private _weightPermissions(
    aclEntries: AclEntriesList,
    permission: AclComplexPermission,
    access?: AclAccess
  ): boolean {
    const permissions = aclEntries.get(permission.object);

    if (!permissions) {
      return false;
    }

    const permissionAccess = permissions.get(permission.permission);

    return (permissionAccess || 0) >= (access || 0)
  }
}
