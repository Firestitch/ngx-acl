import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { AclEntry } from '../interfaces/acl-entry';
import { AclStoreEntry } from '../interfaces/acl-store';
import { AclAccess } from '../enums/acl-access.enum';
import { AclRequire } from '../enums/acl-require.enum';
import { entriesToStore } from '../helpers/entries-transformer';
import { FsAclCache } from './acl-cache.service';


@Injectable()
export class FsAcl {

  private _entries = new BehaviorSubject<Map<string, AclStoreEntry>>(new Map());

  constructor(
    private _cache: FsAclCache,
  ) {}

  get entries$(): Observable<Map<string, AclStoreEntry>> {
    return this._entries.asObservable();
  }

  get entries(): Map<string, AclStoreEntry> {
    return this._entries.getValue();
  }

  public setEntries(aclEntries: AclEntry[]) {
    this._cache.clear();
    this._entries.next(entriesToStore(aclEntries));
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
    require = AclRequire.Any
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

    if (!this.entries.size) {
      return false;
    }

    const value = require === AclRequire.Any ?
      permissionsArray.some((permission) => {
        return this._weightPermissions(permission, access, objectsArray);
      }) :
      permissionsArray.every((permission) => {
        return this._weightPermissions(permission, access, objectsArray);
      });

    this._cache.set(permissions, access, objects, require, value);

    return value;
  }

  private _weightPermissions(permission, access?: AclAccess, objects?: (number | null)[]): boolean {
    const objectsList = this.entries.get(permission);

    if (!objectsList) {
      return false;
    }

    if (objects === undefined) {
      objects = Array.from(objectsList.keys());
    }

    return objects.some((object) => {
      const objectAccess = objectsList.get(object);
      return objectAccess && objectAccess >= (access || 0);
    });
  }
}
