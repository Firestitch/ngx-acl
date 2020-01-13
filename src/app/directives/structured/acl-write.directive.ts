import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { AclStructuredBaseDirective } from './acl-structured-base.directive';
import { FsAclQueryService } from '../../services/acl-query.service';
import { isArray } from 'lodash-es';
import { AclRequire } from '../../enums/acl-require.enum';


@Directive({
  selector: '[fsAclWrite]',
})
export class AclWriteDirective extends AclStructuredBaseDirective {

  @Input('fsAclWrite')
  set fsAclWrite(value) {
    this._requestedPermissions = isArray(value) ? value : [value];
  }

  @Input()
  set fsAclWriteThen(value: TemplateRef<any>) {
    this._thenTemplateRef = value;
    this._thenViewRef = null;
  }

  @Input()
  set fsAclWriteElse(value: TemplateRef<any>) {
    this._elseTemplateRef = value;
    this._elseViewRef = null;
  }

  @Input('fsAclWriteObject')
  protected _permissionObject = null;

  @Input('fsAclWriteRequire')
  protected _require = AclRequire.Any;

  constructor(
    protected _tempalteRef: TemplateRef<null>,
    protected _viewContainerRef: ViewContainerRef,
    protected _aclQuery: FsAclQueryService
  ) {
    super(_tempalteRef, _viewContainerRef, _aclQuery);
  }

  protected _checkPermissions() {
    return this._aclQuery.canWrite(
      this._requestedPermissions,
      this._permissionObject,
      this._require
    );
  }
}
