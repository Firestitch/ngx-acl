import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { AclAccess } from '../enums/acl-access.enum';
import { AclEntry } from '../interfaces/acl-entry';
import { AclRequire } from '../enums/acl-require.enum';
import { isArray } from 'lodash-es';


@Injectable()
export class FsAcl {

  private _entries = new BehaviorSubject<AclEntry[]>([]);

  constructor() {}

  get entries$(): Observable<AclEntry[]> {
    return this._entries.asObservable();
  }

  get entries(): AclEntry[] {
    return this._entries.getValue();
  }

  public setEntries(aclEntries: AclEntry[]) {
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

  public has(permissions: string[] | string, access: AclAccess = null, object = null, require = AclRequire.Any) {

    const _permissions = isArray(permissions) ? Array.from(permissions) : [permissions];

    let has = false;
    if (this.entries.length) {
      if (require === AclRequire.Any) {
        has = _permissions.some((permission) => {
          return this._weightPermissions(access, permission, object);
        });
      } else {
        has = _permissions.every((permission) => {
          return this._weightPermissions(access, permission, object);
        });
      }
    }

    return has;
  }

  private _weightPermissions(access: AclAccess, permission, object): boolean {

    if (!this.entries.length) {
      return false;
    }

    if (object) {

      const aclPermission = this.entries.find(item => {
        return item.object === object && (!permission || (item.permission === permission));
      });

      return aclPermission && (aclPermission.access >= access || access === null);

    } else {

      const aclPermission = this.entries.find(item => {
        return item.object === null && (!permission || (item.permission === permission))
      });

      return aclPermission && (aclPermission.access >= access || access === null);
    }
  }
}
