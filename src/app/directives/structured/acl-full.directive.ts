import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { AclStructuredBaseDirective } from './acl-structured-base.directive';
import { FsAcl } from '../../services/acl.service';
import { AclRequire } from '../../enums/acl-require.enum';
import { AclDirectivePermissions } from '../../interfaces/acl-directive-permissions';
import { prepareRequestedPermissions } from '../../helpers/prepare-requested-permissions';


@Directive({
  selector: '[fsAclFull]',
})
export class AclFullDirective extends AclStructuredBaseDirective {

  @Input('fsAclFull')
  set fsAclFull(value: AclDirectivePermissions) {
    this._requestedPermissions = prepareRequestedPermissions(value);
  }

  @Input()
  set fsAclFullThen(value: TemplateRef<any>) {
    this._thenTemplateRef = value;
    this._thenViewRef = null;
  }

  @Input()
  set fsAclFullElse(value: TemplateRef<any>) {
    this._elseTemplateRef = value;
    this._elseViewRef = null;
  }

  @Input('fsAclFullObject')
  set fsAclFullObject(value: number) {
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
    return this._aclQuery.hasFull(
      this._requestedPermissions,
      this._permissionObject,
      this._require
    );
  }
}
