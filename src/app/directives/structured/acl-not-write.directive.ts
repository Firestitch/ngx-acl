import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';

import { AclWriteDirective } from './acl-write.directive';
import { FsAcl } from '../../services/acl.service';


@Directive({
    selector: '[fsAclNotWrite]',
    inputs: [
        'AclPermissionParams: fsAclNotWrite',
        'aclThen: fsAclNotWriteThen',
        'aclElse: fsAclNotWriteElse',
        '_permissionObject: fsAclNotWriteObject',
        '_require: fsAclNotWriteRequire',
    ],
    standalone: true,
})
export class AclNotWriteDirective extends AclWriteDirective {

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
