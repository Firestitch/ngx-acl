import { AclDirectivePermissions } from '../interfaces/acl-directive-permissions';
import { AclRequestedPermission } from '../interfaces/acl-requested-permission';

export function prepareRequestedPermissions(value: AclDirectivePermissions): AclRequestedPermission[] {
  return Array.isArray(value) ? value : [value];
}
