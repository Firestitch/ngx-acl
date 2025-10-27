import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

import { AclStructuredBaseDirective } from './acl-structured-base.directive';
import { FsAcl } from '../../services/acl.service';


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

  constructor(
    protected _tempalteRef: TemplateRef<null>,
    protected _viewContainerRef: ViewContainerRef,
    protected _aclQuery: FsAcl
  ) {
    super(_tempalteRef, _viewContainerRef, _aclQuery);
  }

  protected _checkPermissions() {
    return this._aclQuery.hasRead(
      this._requestedPermissions,
      this._permissionObject,
      this._require
    );
  }
}
