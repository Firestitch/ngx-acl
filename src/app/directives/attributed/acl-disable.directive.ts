import {
  Directive,
  Optional,
  OnDestroy,
} from '@angular/core';
import { NgControl } from '@angular/forms';

import { FsAcl } from '../../services/acl.service';
import { AclAttributedBaseDirective } from './acl-attributed-base.directive';


@Directive({
  selector: '[fsAclDisable]',
  inputs: [
    'AclPermissionParams: fsAclDisable',
    '_permissionObject: fsAclObject',
    '_require: fsAclRequire',
  ],
})
export class AclDisableDirective extends AclAttributedBaseDirective implements OnDestroy {

  constructor(
    protected _aclQuery: FsAcl,
    @Optional() protected _ngControl: NgControl,
  ) {
    super(_aclQuery);
  }

  protected _checkPermissions(): void {
    const valid = super._checkAclPermissions();

    setTimeout(() => {
      if (this._ngControl && this._ngControl.control) {
        if (valid) {
          this._ngControl.control.disable();
        } else {
          this._ngControl.control.enable();
        }
      }
    });
  }
}
