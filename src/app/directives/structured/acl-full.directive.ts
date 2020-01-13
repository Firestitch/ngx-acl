import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { AclStructuredBaseDirective } from './acl-structured-base.directive';
import { FsAclQueryService } from '../../services/acl-query.service';
import { isArray } from 'lodash-es';
import { AclRequire } from '../../enums/acl-require.enum';


@Directive({
  selector: '[fsAclFull]',
})
export class AclFullDirective extends AclStructuredBaseDirective {

  @Input('fsAclFull')
  set fsAclFull(value) {
    this._requestedPermissions = isArray(value) ? value : [value];
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
  set fsAclFullObject(value) {
    this._permissionObject = value;
  }

  @Input('fsAclFullRequire')
  protected _require = AclRequire.Any;

  constructor(
    protected _tempalteRef: TemplateRef<null>,
    protected _viewContainerRef: ViewContainerRef,
    protected _aclQuery: FsAclQueryService
  ) {
    super(_tempalteRef, _viewContainerRef, _aclQuery);
  }

  protected _checkPermissions() {
    return this._aclQuery.canFull(
      this._requestedPermissions,
      this._permissionObject,
      this._require
    );
  }
}
