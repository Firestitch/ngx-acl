import { Directive } from '@angular/core';


import { AclStructuredBaseDirective } from './acl-structured-base.directive';


@Directive({
  selector: '[fsAclRead]',
  inputs: [
    'AclPermissionParams: fsAclRead',
    'aclThen: fsAclReadThen',
    'aclElse: fsAclReadElse',
    '_permissionObject: fsAclReadObject',
    '_require: fsAclReadRequire',
  ],
  standalone: true,
})
export class AclReadDirective extends AclStructuredBaseDirective {

  protected _checkPermissions() {
    return this._aclQuery.hasRead(
      this._requestedPermissions,
      this._permissionObject,
      this._require,
    );
  }
}
