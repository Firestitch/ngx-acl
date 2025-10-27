import { Directive } from '@angular/core';


import { AclFullDirective } from './acl-full.directive';


@Directive({
  selector: '[fsAclNotFull]',
  inputs: [
    'AclPermissionParams: fsAclNotFull',
    'aclThen: fsAclNotFullThen',
    'aclElse: fsAclNotFullElse',
    '_permissionObject: fsAclNotFullObject',
    '_require: fsAclNotFullRequire',
  ],
  standalone: true,
})
export class AclNotFullDirective extends AclFullDirective {

  protected _checkPermissions() {
    return !super._checkPermissions();
  }
}
