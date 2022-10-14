import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { AclReadDirective } from './acl-read.directive';
import { FsAcl } from '../../services/acl.service';
import { AclRequire } from '../../enums/acl-require.enum';
import { AclComplexPermission } from '../../interfaces/acl-complex-permission';
import { AclDirectivePermissions } from '../../interfaces/acl-directive-permissions';
import { prepareRequestedPermissions } from '../../helpers/prepare-requested-permissions';


@Directive({
  selector: '[fsAclNotRead]',
})
export class AclNotReadDirective extends AclReadDirective {

  @Input('fsAclNotRead')
  set fsAclNotRead(value: AclDirectivePermissions) {
    this._requestedPermissions = prepareRequestedPermissions(value);
  }

  @Input()
  set fsAclNotReadThen(value: TemplateRef<any>) {
    this._thenTemplateRef = value;
    this._thenViewRef = null;
  }

  @Input()
  set fsAclNotReadElse(value: TemplateRef<any>) {
    this._elseTemplateRef = value;
    this._elseViewRef = null;
  }

  @Input('fsAclNotReadObject')
  protected _permissionObject = null;

  @Input('fsAclNotReadRequire')
  protected _require = AclRequire.Any;

  protected _requestedPermissions: (string | AclComplexPermission)[];

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
