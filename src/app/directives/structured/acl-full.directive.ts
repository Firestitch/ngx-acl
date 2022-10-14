import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

import { AclStructuredBaseDirective } from './acl-structured-base.directive';
import { FsAcl } from '../../services/acl.service';


@Directive({
  selector: '[fsAclFull]',
  inputs: [
    'aclRequestedPermissions: fsAclFull',
    'aclThen: fsAclFullThen',
    'aclElse: fsAclFullElse',
    '_permissionObject: fsAclFullObject',
    '_require: fsAclFullRequire',
  ],
})
export class AclFullDirective extends AclStructuredBaseDirective {

  constructor(
    protected _tempalteRef: TemplateRef<null>,
    protected _viewContainerRef: ViewContainerRef,
    protected _aclQuery: FsAcl
  ) {
    super(_tempalteRef, _viewContainerRef, _aclQuery);
  }

  protected _checkPermissions() {
    return this._aclQuery.hasFull(
      this._requestedPermissions,
      this._permissionObject,
      this._require
    );
  }
}
