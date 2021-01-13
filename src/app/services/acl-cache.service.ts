import { Injectable } from '@angular/core';

import { AclAccess } from '../enums/acl-access.enum';
import { AclRequire } from '../enums/acl-require.enum';


@Injectable()
export class FsAclCache {

  private _cache = new Map<string, boolean>();

  public set(
    permissions: string[] | string,
    access: AclAccess,
    objects = null,
    require = AclRequire.Any,
    value: boolean
  ): void {
    const itemKey = this._buildKey(permissions, access, objects, require);

    this._cache.set(itemKey, value);
  }

  public get(
    permissions: string[] | string,
    access: AclAccess,
    objects = null,
    require = AclRequire.Any,
  ): boolean | null {
    const itemKey = this._buildKey(permissions, access, objects, require);

    return this._cache.get(itemKey) || null;
  }

  public clear() {
    this._cache.clear();
  }

  private _buildKey(
    permissions: string[] | string,
    access: AclAccess,
    objects: unknown[] = null,
    require = AclRequire.Any,
  ): string {
    const permissionsKey = Array.isArray(permissions)
      ? permissions
        .sort()
        .join('_')
      : permissions;

    const objectsKey = Array.isArray(objects)
      ? objects
        .sort()
        .join('_')
      : objects || '';

    return `${permissionsKey}_${objectsKey}_${access}_${require}`;
  }

}
