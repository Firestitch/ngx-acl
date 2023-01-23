import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { AclEntry } from '../interfaces/acl-entry';
import { AclAccess } from '../enums/acl-access.enum';
import { AclRequire } from '../enums/acl-require.enum';
import { AclObjectPermission } from '../interfaces/acl-object-permission';
import { AclEntriesList } from '../interfaces/acl-entris-list';
import { transformEntriers } from '../helpers/transform-entriers';
import { generatePermissions } from '../helpers/generate-permissions';
import { AclPermissionParam } from '../interfaces/acl-permission-param';
import { validatePermissionObject } from '../helpers/validate-permission-object';


@Injectable({
  providedIn: 'root',
})
export class FsAcl {

  private _entries = new BehaviorSubject<AclEntriesList>(new Map());

  public get entries$(): Observable<AclEntriesList> {
    return this._entries.asObservable();
  }

  public get entries(): AclEntriesList {
    return this._entries.getValue();
  }

  public setEntries(aclEntries: AclEntry[]) {
    const entries = transformEntriers(aclEntries);
    this._entries.next(entries);
  }

  public clear() {
    this._entries.next(new Map());
  }

  public hasRead(
    permissions: AclPermissionParam,
    object: number | number[] = null,
    require = AclRequire.Any,
  ): boolean {
    return this.has(permissions, AclAccess.Read, object, require);
  }

  public hasWrite(
    permissions: AclPermissionParam,
    object: number | number[] = null,
    require = AclRequire.Any,
  ): boolean {
    return this.has(permissions, AclAccess.Write, object, require);
  }

  public hasFull(
    permissions: AclPermissionParam,
    object: number | number[] = null,
    require = AclRequire.Any,
  ): boolean {
    return this.has(permissions, AclAccess.Full, object, require);
  }

  public has(
    permissions: AclPermissionParam,
    access?: AclAccess,
    objects?: number | number[],
    require = AclRequire.Any,
    aclEntries?: AclEntry[],
  ): boolean {
    const entries = !!aclEntries
      ? transformEntriers(aclEntries)
      : this.entries;

    if (permissions && !Array.isArray(permissions)) {
      permissions = [permissions as any];
    }

    if ((permissions as unknown[]).length === 0) {
      return true;
    }

    objects = typeof objects === 'number' ? [objects] : objects;

    const requestedPermissions: AclObjectPermission[] = (permissions as any)
      .reduce((acc, permission) => {
        if (typeof permission === 'string') {
          acc.push(...generatePermissions(permission, objects as any));
        } else {
          if (permission.object === undefined) {
            permission.object = null;
          } else {
            validatePermissionObject(permission.object, permission);
          }

          acc.push(permission);
        }

        return acc;
      }, []);

    if (require === AclRequire.Any) {
      return requestedPermissions.some((permission) => {
        return this._weightPermissions(entries, permission, permission.access || access);
      });
    } else {
      return requestedPermissions.every((permission) => {
        return this._weightPermissions(entries, permission, permission.access || access);
      });
    }
  }

  public hasPermission(permission: string|string[]): boolean {
    const permissions = typeof permission === 'string' ? Array(permission) : permission;
    return Array.from(this.entries)
    .some((entry) => {
      return Array.from(entry[1])
        .some((item) => {
          return permissions.indexOf(item[0]) !== -1;
        });
    });
  }

  private _weightPermissions(
    aclEntries: AclEntriesList,
    permission: AclObjectPermission,
    access?: AclAccess
  ): boolean {
    const permissions = aclEntries.get(permission.object);

    if (!permissions) {
      return false;
    }

    const permissionAccess = permissions.get(permission.permission);

    return (permissionAccess || 0) >= (access || AclAccess.Read)
  }
}
