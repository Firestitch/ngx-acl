import { AclObjectPermission } from '../interfaces/acl-object-permission';
import { validatePermissionObject } from './validate-permission-object';

export function generatePermissions(permission: string, object: number | number[]): AclObjectPermission[] {
  if (object === null || object === undefined) {
    return [{
      permission: permission,
      object: object as number,
    }];
  }

  const objects = typeof object === 'number' ? [object] : object;

  return objects.reduce((acc, object) => {
    validatePermissionObject(object, permission);

    acc.push({
      permission: permission,
      object: object,
    });

    return acc;
  }, []);
}
