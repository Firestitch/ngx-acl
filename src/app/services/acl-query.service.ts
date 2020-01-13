import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { AclAccess } from '../enums/acl-access.enum';
import { AclPermission } from '../interfaces/acl-permission';
import { AclRequire } from '../enums/acl-require.enum';


@Injectable()
export class FsAclQueryService {

  private _permissions = new BehaviorSubject<AclPermission[]>([]);

  constructor() {}

  get permissions$(): Observable<AclPermission[]> {
    return this._permissions.asObservable();
  }

  get permissions() {
    return this._permissions.getValue();
  }

  public setPermissions(permissions: AclPermission[]) {
    this._permissions.next(permissions);
  }

  public clearPermissions() {
    this._permissions.next(null);
  }

  public canRead(permissions: string[], permissionObject = null, require: AclRequire = AclRequire.Any) {
    return this._canAccess(permissions, AclAccess.Read, permissionObject, require);
  }

  public canWrite(permissions: string[], permissionObject = null, require: AclRequire = AclRequire.Any) {
    return this._canAccess(permissions, AclAccess.Write, permissionObject, require);
  }

  public canFull(permissions: string[], permissionObject = null, require: AclRequire = AclRequire.Any) {
    return this._canAccess(permissions, AclAccess.Full, permissionObject, require);
  }

  private _canAccess(permissions: string[], access: AclAccess, permissionObject, require: AclRequire = AclRequire.Any) {

    if (!this.permissions.length) {
      return false;
    }

    if (require === AclRequire.Any) {
      return permissions.some((permission) => {
        return this._weightPermissions(access, permission, permissionObject);
      });
    } else {
      return permissions.every((permission) => {
        return this._weightPermissions(access, permission, permissionObject);
      });
    }
  }

  private _weightPermissions(access: AclAccess, permission, permissionObject): boolean {

    if (!this.permissions.length) {
      return false;
    }

    if (permissionObject) {

      const aclPermission = this.permissions.find(item => {
        return item.object === permissionObject && (!permission || (item.permission === permission));
      });

      return aclPermission && aclPermission.access >= access;

    } else {

      const aclPermission = this.permissions.find(item => {
        return item.object === null && (!permission || (item.permission === permission))
      });

      return aclPermission && aclPermission.access >= access;
    }
  }
}
