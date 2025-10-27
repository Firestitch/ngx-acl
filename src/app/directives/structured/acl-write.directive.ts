import { Directive } from '@angular/core';


import { AclStructuredBaseDirective } from './acl-structured-base.directive';


@Directive({
  selector: '[fsAclWrite]',
  inputs: [
    'AclPermissionParams: fsAclWrite',
    'aclThen: fsAclWriteThen',
    'aclElse: fsAclWriteElse',
    '_permissionObject: fsAclWriteObject',
    '_require: fsAclWriteRequire',
  ],
  standalone: true,
})
export class AclWriteDirective extends AclStructuredBaseDirective {

  protected _checkPermissions() {
    return this._aclQuery.hasWrite(
      this._requestedPermissions,
      this._permissionObject,
      this._require,
    );
  }
}
