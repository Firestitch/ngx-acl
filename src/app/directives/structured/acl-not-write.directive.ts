import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { AclWriteDirective } from './acl-write.directive';
import { FsAcl } from '../../services/acl.service';
import { AclRequire } from '../../enums/acl-require.enum';
import { AclDirectivePermissions } from '../../interfaces/acl-directive-permissions';
import { prepareRequestedPermissions } from '../../helpers/prepare-requested-permissions';


@Directive({
  selector: '[fsAclNotWrite]',
})
export class AclNotWriteDirective extends AclWriteDirective {

  @Input('fsAclNotWrite')
  set fsAclNotWrite(value: AclDirectivePermissions) {
    this._requestedPermissions = prepareRequestedPermissions(value);
  }

  @Input()
  set fsAclNotWriteThen(value: TemplateRef<any>) {
    this._thenTemplateRef = value;
    this._thenViewRef = null;
  }

  @Input()
  set fsAclNotWriteElse(value: TemplateRef<any>) {
    this._elseTemplateRef = value;
    this._elseViewRef = null;
  }

  @Input('fsAclNotWriteObject')
  protected _permissionObject = null;

  @Input('fsAclNotWriteRequire')
  protected _require = AclRequire.Any;

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
