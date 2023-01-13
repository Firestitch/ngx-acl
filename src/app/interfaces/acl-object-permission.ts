import { AclAccess } from "../enums";

export interface AclObjectPermission {
  permission: string;
  object?: number;
  access?: AclAccess;
}
