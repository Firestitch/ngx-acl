import { Directive } from '@angular/core';


import { AclWriteDirective } from './acl-write.directive';


@Directive({
  selector: '[fsAclNotWrite]',
  inputs: [
    'AclPermissionParams: fsAclNotWrite',
    'aclThen: fsAclNotWriteThen',
    'aclElse: fsAclNotWriteElse',
    '_permissionObject: fsAclNotWriteObject',
    '_require: fsAclNotWriteRequire',
  ],
  standalone: true,
})
export class AclNotWriteDirective extends AclWriteDirective {

  protected _checkPermissions() {
    return !super._checkPermissions();
  }
}
