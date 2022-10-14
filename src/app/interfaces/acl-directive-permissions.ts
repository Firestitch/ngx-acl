import { AclComplexPermission } from './acl-complex-permission';

export type AclDirectivePermissions = string | (string | AclComplexPermission)[];
