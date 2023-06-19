import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { AclEntry } from '../interfaces/acl-entry';
import { AclAccess } from '../enums/acl-access.enum';
import { AclRequire } from '../enums/acl-require.enum';
import { AclObjectPermission } from '../interfaces/acl-object-permission';
import { AclEntriesList, AclPermissionAccessMap } from '../interfaces/acl-entris-list';
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
    permissionParam: AclPermissionParam,
    access?: AclAccess,
    objects?: number | number[],
    require = AclRequire.Any,
    aclEntries?: AclEntry[],
  ): boolean {
    const entries = !!aclEntries
      ? transformEntriers(aclEntries)
      : this.entries;

    const aclObjectPermissions = this._permissionParamAclObjectPermissions(permissionParam, objects);

    if (aclObjectPermissions.length === 0) {
      return true;
    }

    if (require === AclRequire.Any) {
      return aclObjectPermissions.some((aclObjectPermission) => {
        return this._weightPermissions(entries, aclObjectPermission, aclObjectPermission.access || access);
      });
    } else {
      return aclObjectPermissions.every((aclObjectPermission) => {
        return this._weightPermissions(entries, aclObjectPermission, aclObjectPermission.access || access);
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

  private _permissionParamAclObjectPermissions(permissionParam: AclPermissionParam, objects?: number[] | number): AclObjectPermission[] {
    let aclPermissionParams: AclObjectPermission[] = (permissionParam as any) || [];

    if (!Array.isArray(permissionParam)) {
      aclPermissionParams = [permissionParam as any];
    }

    const aclObjectPermissions = aclPermissionParams
      .reduce((acc: AclObjectPermission[], aclObjectPermission: any) => {
        if (typeof aclObjectPermission === 'string') {
          acc.push(...generatePermissions(aclObjectPermission, objects as number));
        } else {
          validatePermissionObject(aclObjectPermission.object, aclObjectPermission);

          acc.push(aclObjectPermission);
        }

        return acc;
      }, []);

    return aclObjectPermissions;
  }

  private _weightPermissions(
    aclEntries: AclEntriesList,
    permission: AclObjectPermission,
    access?: AclAccess
  ): boolean {
    if(permission.object === undefined) {
      const exists = Array.from(aclEntries.values())
        .some((aclPermissionAccessMap: AclPermissionAccessMap) => {
          return this._hasAclPermissionAccess(aclPermissionAccessMap, permission.permission, access);
        });

      return exists;
    }

    const aclPermissionAccessMap = aclEntries.get(permission.object);

    if (!aclPermissionAccessMap) {
      return false;
    }
    
    return this._hasAclPermissionAccess(aclPermissionAccessMap, permission.permission, access);
  }

  private _hasAclPermissionAccess(aclPermissionAccessMap: AclPermissionAccessMap, permission: string, access: AclAccess): boolean {
    return this._hasAccess(aclPermissionAccessMap.get(permission), access);
  }

  private _hasAccess(permissionAccess: number, access: AclAccess): boolean {
    return (permissionAccess || 0) >= (access || AclAccess.Read)
  }
}
