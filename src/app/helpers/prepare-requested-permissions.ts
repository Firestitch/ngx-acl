import { AclObjectPermission } from '../interfaces/acl-object-permission';
import { AclDirectivePermissions } from '../interfaces/acl-directive-permissions';

export function prepareRequestedPermissions(value: AclDirectivePermissions): string[] | AclObjectPermission[] {
  const requestedPermissions = Array.isArray(value) ? value : [value as any];

  return requestedPermissions.filter((permission) => {
    const stringEntry = typeof permission === 'string';
    const objectEntry = typeof permission === 'object' && typeof permission?.permission === 'string'

    return stringEntry || objectEntry;
  })
}
