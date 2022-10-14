import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

import { AclFullDirective } from './acl-full.directive';
import { FsAcl } from '../../services/acl.service';


@Directive({
  selector: '[fsAclNotFull]',
  inputs: [
    'AclPermissionParams: fsAclNotFull',
    'aclThen: fsAclNotFullThen',
    'aclElse: fsAclNotFullElse',
    '_permissionObject: fsAclNotFullObject',
    '_require: fsAclNotFullRequire',
  ],
})
export class AclNotFullDirective extends AclFullDirective {

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
