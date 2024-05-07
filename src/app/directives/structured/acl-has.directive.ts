import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

import { FsAcl } from '../../services/acl.service';
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
})
export class AclHasDirective extends AclStructuredBaseDirective {

  constructor(
    protected _tempalteRef: TemplateRef<null>,
    protected _viewContainerRef: ViewContainerRef,
    protected _aclQuery: FsAcl
  ) {
    super(_tempalteRef, _viewContainerRef, _aclQuery);
  }

  protected _checkPermissions() {
    return this._aclQuery.has(
      this._requestedPermissions,
    );
  }
}
