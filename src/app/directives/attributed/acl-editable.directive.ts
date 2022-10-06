import {
  Directive,
  HostBinding,
  Input,
  OnDestroy,
} from '@angular/core';

import { FsAcl } from '../../services/acl.service';
import { AclAttributedBaseDirective } from './acl-attributed-base.directive';
import { AclRequire } from '../../enums';
import { AclComplexPermission } from '../../interfaces/acl-complex-permission';


@Directive({
  selector: '[fsAclEditable]',
})
export class AclEditableDirective extends AclAttributedBaseDirective implements OnDestroy {

  @Input('fsAclEditable')
  set fsAclEditable(value: string | (string | AclComplexPermission)[]) {
    this._requestedPermissions = Array.isArray(value) ? value : [value];
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
    protected _aclQuery: FsAcl,
  ) {
    super(_aclQuery);
  }

  protected _checkPermissions() {
    this._readonly = !this._aclQuery.hasWrite(
      this._requestedPermissions,
      this._permissionObject,
      this._require
    );
  }
}
