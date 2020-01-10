import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { AccessPermission } from '../enums/access-permission.enum';


@Injectable()
export class FsAclQueryService {

  private _permissions = new BehaviorSubject<{ [key: string]: number }>(null);

  constructor() {}

  get permissionsChange$(): Observable<{ [key: string]: number }> {
    return this._permissions.asObservable();
  }

  get permissions() {
    return this._permissions.getValue();
  }

  public setPermissions(permissions: any) {
    const permissionsObject = {};

    if (permissions['']) {
      permissionsObject['global'] = permissions[''];

      delete permissions[''];
    }

    this._permissions.next({
      ...permissionsObject,
      ...permissions,
    });
  }

  public resetPermissions() {
    this._permissions.next(null);
  }

  public canRead(permissions: string[], permissionObject = null, predicate = 'OR') {
    return this._canAccess(permissions, AccessPermission.Read, permissionObject, predicate);
  }

  public canWrite(permissions: string[], permissionObject = null, predicate = 'OR') {
    return this._canAccess(permissions, AccessPermission.Write, permissionObject, predicate);
  }

  public canFull(permissions: string[], permissionObject = null, predicate = 'OR') {
    return this._canAccess(permissions, AccessPermission.Full, permissionObject, predicate);
  }

  private _canAccess(permissions: string[], access: AccessPermission, permissionObject = null, predicate = 'OR') {
    if (!this.permissions) {
      return false;
    }

    if (predicate === 'OR') {
      return permissions.some((permission) => {
        return this._weightPermissions(access, permission, permissionObject);
      });
    } else {
      return permissions.every((permission) => {
        return this._weightPermissions(access, permission, permissionObject);
      });
    }
  }

  private _weightPermissions(targetWeight, permission, permissionObject): boolean {
    if (!this.permissions || !this.permissions['global']) { return false; }

    if (permissionObject && this.permissions[permissionObject]) {
      return Math.max(
        this.permissions[permissionObject][permission] || 0,
        this.permissions['global'][permission] || 0
      ) >= targetWeight;
    } else {
      return this.permissions['global'][permission] >= targetWeight;
    }
  }
}
