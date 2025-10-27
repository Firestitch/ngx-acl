import { Directive } from '@angular/core';


import { AclReadDirective } from './acl-read.directive';


@Directive({
  selector: '[fsAclNotRead]',
  inputs: [
    'AclPermissionParams: fsAclNotRead',
    'aclThen: fsAclNotReadThen',
    'aclElse: fsAclNotReadElse',
    '_permissionObject: fsAclNotReadObject',
    '_require: fsAclNotReadRequire',
  ],
  standalone: true,
})
export class AclNotReadDirective extends AclReadDirective {

  protected _checkPermissions() {
    return !super._checkPermissions();
  }
}
