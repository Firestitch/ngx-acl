import { AclAccess } from '../enums/acl-access.enum';

export interface AclPermission {
  access: AclAccess,
  permission: string,
  object: number
}
