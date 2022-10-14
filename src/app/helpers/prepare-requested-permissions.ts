import { AclObjectPermission } from '../interfaces/acl-object-permission';
import { AclDirectivePermissions } from '../interfaces/acl-directive-permissions';

export function prepareRequestedPermissions(value: AclDirectivePermissions): string[] | AclObjectPermission[] {
  return Array.isArray(value) ? value : [value as any];
}
