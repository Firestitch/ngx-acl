import {
  Directive,
  Input,
  Optional,
  OnDestroy,
} from '@angular/core';
import { NgControl } from '@angular/forms';

import { FsAcl } from '../../services/acl.service';
import { AclAttributedBaseDirective } from './acl-attributed-base.directive';
import { AclRequire } from '../../enums';


@Directive({
  selector: '[fsAclEnable]'
})
export class AclEnableDirective extends AclAttributedBaseDirective implements OnDestroy {

  @Input('fsAclEnable')
  set fsAclEnabled(value) {
    this._requestedPermissions = Array.isArray(value) ? value : [value];
  }

  @Input('fsAclObject')
  set fsAclEnabledObject(value) {
    this._permissionObject = value;
  }

  @Input('fsAclRequire')
  protected _require = AclRequire.Any;

  constructor(
    protected _aclQuery: FsAcl,
    @Optional() protected _ngControl: NgControl,
  ) {
    super(_aclQuery);
  }

  protected _checkPermissions() {
    const valid = this._aclQuery.hasWrite(
      this._requestedPermissions,
      this._permissionObject,
      this._require
    );

    setTimeout(() => {
      if (this._ngControl && this._ngControl.control) {
        if (valid) {
          this._ngControl.control.enable();
        } else {
          this._ngControl.control.disable();
        }
      }
    });
  }
}
