import {
  Directive,
  Input,
  Optional,
  OnDestroy,
} from '@angular/core';
import { NgControl } from '@angular/forms';

import { FsAclQueryService } from '../../services/acl-query.service';
import { AclAttributedBaseDirective } from './acl-attributed-base.directive';


@Directive({
  selector: '[fsAclDisabled]',
})
export class AclDisabledDirective extends AclAttributedBaseDirective implements OnDestroy {

  @Input('fsAclDisabled')
  protected _requestedPermissions: string[];

  protected _hasValidAccess = false;

  constructor(
    protected _aclQuery: FsAclQueryService,
    @Optional() protected _ngControl: NgControl,
  ) {
    super(_aclQuery);
  }

  protected _checkPermissions() {
    this._hasValidAccess = this._aclQuery.canWrite(
      this._requestedPermissions,
      this._permissionObject,
      this._predicate
    );

    setTimeout(() => {
      if (this._ngControl && this._ngControl.control) {
        if (!this._hasValidAccess) {
          this._ngControl.control.enable();
        } else {
          this._ngControl.control.disable();
        }
      }
    });
  }
}
