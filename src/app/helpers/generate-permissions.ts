import { AclComplexPermission } from '../interfaces/acl-complex-permission';

export function generatePermissions(permission: string, objects: number[]): AclComplexPermission[] {

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
