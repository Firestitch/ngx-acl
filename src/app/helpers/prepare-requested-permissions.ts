import { AclDirectivePermissions } from '../interfaces/acl-directive-permissions';
import { AclObjectPermission } from '../interfaces/acl-object-permission';

export function prepareRequestedPermissions(value: AclDirectivePermissions): string[] | AclObjectPermission[] {
  return Array.isArray(value) ? value : [value as any];
}
