import { Directive } from '@angular/core';


import { AclStructuredBaseDirective } from './acl-structured-base.directive';


@Directive({
  selector: '[fsAclFull]',
  inputs: [
    'AclPermissionParams: fsAclFull',
    'aclThen: fsAclFullThen',
    'aclElse: fsAclFullElse',
    '_permissionObject: fsAclFullObject',
    '_require: fsAclFullRequire',
  ],
  standalone: true,
})
export class AclFullDirective extends AclStructuredBaseDirective {

  protected _checkPermissions() {
    return this._aclQuery.hasFull(
      this._requestedPermissions,
      this._permissionObject,
      this._require,
    );
  }
}
