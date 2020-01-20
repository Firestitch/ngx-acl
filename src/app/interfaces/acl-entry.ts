import { AclAccess } from '../enums/acl-access.enum';

export interface AclEntry {
  access: AclAccess,
  permission: string,
  object: number
}
