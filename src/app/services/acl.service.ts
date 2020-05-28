import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { isArray } from 'lodash-es';

import { AclEntry } from '../interfaces/acl-entry';
import { AclStoreEntry } from '../interfaces/acl-store';
import { AclAccess } from '../enums/acl-access.enum';
import { AclRequire } from '../enums/acl-require.enum';
import { entriesToStore } from '../helpers/entries-transformer';


@Injectable()
export class FsAcl {

  private _entries = new BehaviorSubject<Map<string, AclStoreEntry>>(new Map());

  constructor() {}

  get entries$(): Observable<Map<string, AclStoreEntry>> {
    return this._entries.asObservable();
  }

  get entries(): Map<string, AclStoreEntry> {
    return this._entries.getValue();
  }

  public setEntries(aclEntries: AclEntry[]) {
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
    access: AclAccess = null,
    objects = null,
    require = AclRequire.Any
  ) {

    const permissionsArray = isArray(permissions) ? Array.from(permissions) : [permissions];
    const objectsArray: (number | null)[] = isArray(objects) ? Array.from(objects) : [objects];

    if (!this.entries.size) {
      return false;
    }

    if (require === AclRequire.Any) {
      return permissionsArray.some((permission) => {
        return this._weightPermissions(access, permission, objectsArray);
      });
    } else {
      return permissionsArray.every((permission) => {
        return this._weightPermissions(access, permission, objectsArray);
      });
    }
  }

  private _weightPermissions(access: AclAccess, permission, objects: (number | null)[]): boolean {
    const objectsList = this.entries.get(permission);

    if (!objectsList) { return false; }

    return objects.some((object) => {
      const objectAccess = objectsList.get(object);

      if (!objectAccess) { return false }

      return objectAccess >= access;
    });
  }
}
