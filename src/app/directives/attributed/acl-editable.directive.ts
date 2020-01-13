import {
  Directive,
  HostBinding,
  Input,
  OnDestroy,
} from '@angular/core';

import { FsAclQueryService } from '../../services/acl-query.service';
import { AclAttributedBaseDirective } from './acl-attributed-base.directive';
import { isArray } from 'lodash-es';
import { AclRequire } from '../../enums';


@Directive({
  selector: '[fsAclEditable]',
})
export class AclEditableDirective extends AclAttributedBaseDirective implements OnDestroy {

  @Input('fsAclEditable')
  set fsAclEditable(value) {
    this._requestedPermissions = isArray(value) ? value : [value];
  }

  @HostBinding('readonly')
  protected _readonly = false;

  @Input('fsAclObject')
  set fsAclEnabledObject(value) {
    this._permissionObject = value;
  }

  @Input('fsAclRequire')
  protected _require = AclRequire.Any;

  constructor(
    protected _aclQuery: FsAclQueryService,
  ) {
    super(_aclQuery);
  }

  protected _checkPermissions() {
    this._readonly = !this._aclQuery.canWrite(
      this._requestedPermissions,
      this._permissionObject,
      this._require
    );
  }
}
