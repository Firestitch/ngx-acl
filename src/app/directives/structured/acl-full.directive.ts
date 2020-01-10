import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { AclStructuredBaseDirective } from './acl-structured-base.directive';
import { FsAclQueryService } from '../../services/acl-query.service';


@Directive({
  selector: '[fsAclFull]',
})
export class AclFullDirective extends AclStructuredBaseDirective {

  @Input('fsAclFull')
  protected _requestedPermissions: string[];

  @Input()
  set fsAclFullThen(value: TemplateRef<any>) {
    this._thenTemplateRef = value;
    this._thenViewRef = null;

    this._checkPermissions();
  }

  @Input()
  set fsAclFullElse(value: TemplateRef<any>) {
    this._elseTemplateRef = value;
    this._elseViewRef = null;

    this._checkPermissions();
  }

  @Input('fsAclFullObject')
  protected _permissionObject = null;

  @Input('fsAclFullPredicate')
  protected _predicate = 'OR';

  constructor(
    protected _tempalteRef: TemplateRef<null>,
    protected _viewContainerRef: ViewContainerRef,
    protected _aclQuery: FsAclQueryService
  ) {
    super(_tempalteRef, _viewContainerRef, _aclQuery);
  }

  protected _checkPermissions() {
    this._context.$implicit = this._aclQuery.canFull(
      this._requestedPermissions,
      this._permissionObject,
      this._predicate
    );
    this._updateView();
  }
}
