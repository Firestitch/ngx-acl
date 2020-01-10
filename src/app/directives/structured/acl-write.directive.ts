import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { AclStructuredBaseDirective } from './acl-structured-base.directive';
import { FsAclQueryService } from '../../services/acl-query.service';


@Directive({
  selector: '[fsAclWrite]',
})
export class AclWriteDirective extends AclStructuredBaseDirective {

  @Input('fsAclWrite')
  protected _requestedPermissions: string[];

  @Input()
  set fsAclWriteThen(value: TemplateRef<any>) {
    this._thenTemplateRef = value;
    this._thenViewRef = null;

    this._checkPermissions();
  }

  @Input()
  set fsAclWriteElse(value: TemplateRef<any>) {
    this._elseTemplateRef = value;
    this._elseViewRef = null;

    this._checkPermissions();
  }

  @Input('fsAclWriteObject')
  protected _permissionObject = null;

  @Input('fsAclWritePredicate')
  protected _predicate = 'OR';

  constructor(
    protected _tempalteRef: TemplateRef<null>,
    protected _viewContainerRef: ViewContainerRef,
    protected _aclQuery: FsAclQueryService
  ) {
    super(_tempalteRef, _viewContainerRef, _aclQuery);
  }

  protected _checkPermissions() {
    this._context.$implicit = this._aclQuery.canWrite(
      this._requestedPermissions,
      this._permissionObject,
      this._predicate
    );

    this._updateView();
  }
}
