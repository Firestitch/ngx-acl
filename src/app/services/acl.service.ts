import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { AclEntry, AclPermission } from '../interfaces/acl-entry';
import { AclAccess } from '../enums/acl-access.enum';
import { AclRequire } from '../enums/acl-require.enum';
import { FsAclCache } from './acl-cache.service';


@Injectable()
export class FsAcl {

  private _entries = new BehaviorSubject<AclEntry[]>([]);

  public constructor(
    private _cache: FsAclCache,
  ) {}

  public get entries$(): Observable<AclEntry[]> {
    return this._entries.asObservable();
  }

  public get entries(): AclEntry[] {
    return this._entries.getValue();
  }

  public setEntries(aclEntries: AclEntry[]) {
    this._cache.clear();
    this._entries.next(aclEntries);
  }

  public clear() {
    this._entries.next(null);
  }

  public hasRead(permissions: string[] | string, object = null, require = AclRequire.Any) {
    return this.has(permissions, AclAccess.Read, object, require);
  }

  public hasWrite(permissions: string[] | string, object = null, require = AclRequire.Any) {
    return this.has(permissions, AclAccess.Write, object, require);
  }

  public hasFull(permissions: string[] | string, object = null, require = AclRequire.Any) {
    return this.has(permissions, AclAccess.Full, object, require);
  }

  public has(
    permissions: string[] | string,
    access?: AclAccess,
    objects?: number | number[],
    require = AclRequire.Any,
    aclEntries?: AclEntry[],
  ) {
    // Check cache first
    const cachedValue = this._cache.get(permissions, access, objects, require);

    if (cachedValue !== null) {
      return cachedValue;
    }

    // If no cached value then...
    const permissionsArray = Array.isArray(permissions) ? Array.from(permissions) : [permissions];
    let objectsArray: (number | null)[];

    if (objects !== undefined) {
      objectsArray = Array.isArray(objects) ? Array.from(objects) : [objects];
    }

    aclEntries = aclEntries === undefined ? this.entries : aclEntries;

    if (!aclEntries.length) {
      return false;
    }

    const value = require === AclRequire.Any ?
      permissionsArray.some((permission) => {
        return this._weightPermissions(aclEntries, permission, access, objectsArray);
      }) :
      permissionsArray.every((permission) => {
        return this._weightPermissions(aclEntries, permission, access, objectsArray);
      });

    this._cache.set(permissions, access, objects, require, value);

    return value;
  }

  private _weightPermissions(aclEntries: AclEntry[], permission: string, access?: AclAccess, objects?: (number | null)[]): boolean {
    return aclEntries.some((aclEntry) => {
      if (objects !== undefined && objects.indexOf(aclEntry.objectId) === -1) {
        return false;
      }

      return aclEntry.permissions
        .some((aclPermission: AclPermission) => {
          return (!permission || aclPermission.value === permission) && (aclPermission.access || 0) >= (access || 0);
        });
    });
  }
}
