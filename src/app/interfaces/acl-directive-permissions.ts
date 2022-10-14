import { AclObjectPermission } from './acl-object-permission';

export type AclDirectivePermissions = string | (string | AclObjectPermission)[];
