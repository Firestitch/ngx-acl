import { AclObjectPermission } from '../interfaces/acl-object-permission';

export function generatePermissions(permission: string, objects: number[]): AclObjectPermission[] {

  if (!objects) {
    return [{
      permission: permission,
      object: null,
    }];
  }

  return objects.reduce((acc, object) => {
    acc.push({
      permission: permission,
      object: object,
    });

    return acc;
  }, []);
}
