import {
  Directive,
  HostBinding,
  Input,
  OnDestroy,
} from '@angular/core';

import { FsAclQueryService } from '../../services/acl-query.service';
import { AclAttributedBaseDirective } from './acl-attributed-base.directive';


@Directive({
  selector: '[fsAclEditable]',
})
export class AclEditableDirective extends AclAttributedBaseDirective implements OnDestroy {

  @Input('fsAclEditable')
  protected _requestedPermissions: string[];

  @HostBinding('readonly')
  protected _hasValidAccess = false;

  constructor(protected _aclQuery: FsAclQueryService) {
    super(_aclQuery);
  }

  protected _checkPermissions() {
    this._hasValidAccess = !this._aclQuery.canWrite(
      this._requestedPermissions,
      this._permissionObject,
      this._predicate
    );
  }
}
