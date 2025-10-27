import { Directive } from '@angular/core';


import { AclStructuredBaseDirective } from './acl-structured-base.directive';


@Directive({
  selector: '[fsAclHas]',
  inputs: [
    'AclPermissionParams: fsAclHas',
    'aclThen: fsAclHasThen',
    'aclElse: fsAclHasElse',
    '_permissionObject: fsAclHasObject',
    '_require: fsAclHasRequire',
  ],
  standalone: true,
})
export class AclHasDirective extends AclStructuredBaseDirective {

  protected _checkPermissions() {
    return this._aclQuery.has(
      this._requestedPermissions,
    );
  }
}
