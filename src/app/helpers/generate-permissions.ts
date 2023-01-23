import { AclObjectPermission } from '../interfaces/acl-object-permission';
import { validatePermissionObject } from './validate-permission-object';

export function generatePermissions(permission: string, objects: number[]): AclObjectPermission[] {

  if (!objects) {
    return [{
      permission: permission,
      object: null,
    }];
  }

  return objects.reduce((acc, object) => {
    validatePermissionObject(object, permission);

    acc.push({
      permission: permission,
      object: object,
    });

    return acc;
  }, []);
}
