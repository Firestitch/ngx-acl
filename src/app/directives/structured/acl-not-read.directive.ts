import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

import { AclReadDirective } from './acl-read.directive';
import { FsAcl } from '../../services/acl.service';


@Directive({
  selector: '[fsAclNotRead]',
  inputs: [
    'AclPermissionParams: fsAclNotRead',
    'aclThen: fsAclNotReadThen',
    'aclElse: fsAclNotReadElse',
    '_permissionObject: fsAclNotReadObject',
    '_require: fsAclNotReadRequire',
  ],
})
export class AclNotReadDirective extends AclReadDirective {

  constructor(
    protected _tempalteRef: TemplateRef<null>,
    protected _viewContainerRef: ViewContainerRef,
    protected _aclQuery: FsAcl
  ) {
    super(_tempalteRef, _viewContainerRef, _aclQuery);
  }

  protected _checkPermissions() {
    return !super._checkPermissions();
  }
}
