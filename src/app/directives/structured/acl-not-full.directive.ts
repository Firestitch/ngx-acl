import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { AclFullDirective } from './acl-full.directive';
import { FsAcl } from '../../services/acl.service';
import { AclRequire } from '../../enums/acl-require.enum';
import { AclDirectivePermissions } from '../../interfaces/acl-directive-permissions';
import { prepareRequestedPermissions } from '../../helpers/prepare-requested-permissions';


@Directive({
  selector: '[fsAclNotFull]',
})
export class AclNotFullDirective extends AclFullDirective {

  @Input('fsAclNotFull')
  set fsAclNotFull(value: AclDirectivePermissions) {
    this._requestedPermissions = prepareRequestedPermissions(value);
  }

  @Input()
  set fsAclNotFullThen(value: TemplateRef<any>) {
    this._thenTemplateRef = value;
    this._thenViewRef = null;
  }

  @Input()
  set fsAclNotFullElse(value: TemplateRef<any>) {
    this._elseTemplateRef = value;
    this._elseViewRef = null;
  }

  @Input('fsAclNotFullObject')
  set fsAclNotFullObject(value: number) {
    this._permissionObject = value;
  }

  @Input('fsAclFullRequire')
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
