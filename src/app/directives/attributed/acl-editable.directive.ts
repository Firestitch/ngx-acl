import {
  Directive,
  HostBinding,
  OnDestroy,
} from '@angular/core';

import { FsAcl } from '../../services/acl.service';
import { AclAttributedBaseDirective } from './acl-attributed-base.directive';


@Directive({
  selector: '[fsAclEditable]',
  inputs: [
    'aclRequestedPermissions: fsAclEditable',
    '_permissionObject: fsAclObject',
    '_require: fsAclRequire',
  ],
})
export class AclEditableDirective extends AclAttributedBaseDirective implements OnDestroy {

  @HostBinding('readonly')
  protected _readonly = false;

  constructor(
    protected _aclQuery: FsAcl,
  ) {
    super(_aclQuery);
  }

  protected _checkPermissions(): void {
    this._readonly = !super._checkAclPermissions();
  }
}
