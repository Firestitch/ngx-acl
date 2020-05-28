import { AclAccess } from '../enums/acl-access.enum';

export interface AclEntry {
  objectId: number;
  permissions: AclPermission[];
}

export interface AclPermission {
  access: AclAccess;
  value: string;
}
