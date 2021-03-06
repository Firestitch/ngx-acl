import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { AclStructuredBaseDirective } from './acl-structured-base.directive';
import { FsAcl } from '../../services/acl.service';
import { isArray } from 'lodash-es';
import { AclRequire } from '../../enums/acl-require.enum';


@Directive({
  selector: '[fsAclRead]',
})
export class AclReadDirective extends AclStructuredBaseDirective {

  @Input('fsAclRead')
  set fsAclRead(value) {
    this._requestedPermissions = isArray(value) ? value : [value];
  }

  @Input()
  set fsAclReadThen(value: TemplateRef<any>) {
    this._thenTemplateRef = value;
    this._thenViewRef = null;
  }

  @Input()
  set fsAclReadElse(value: TemplateRef<any>) {
    this._elseTemplateRef = value;
    this._elseViewRef = null;
  }

  @Input('fsAclReadObject')
  protected _permissionObject = null;

  @Input('fsAclReadRequire')
  protected _require = AclRequire.Any;

  protected _requestedPermissions: string[];

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
