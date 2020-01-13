import {
  Directive,
  Input,
  Optional,
  OnDestroy,
} from '@angular/core';
import { NgControl } from '@angular/forms';

import { FsAclQueryService } from '../../services/acl-query.service';
import { AclAttributedBaseDirective } from './acl-attributed-base.directive';
import { isArray } from 'lodash-es';
import { AclRequire } from 'src/app/enums';


@Directive({
  selector: '[fsAclDisable]'
})
export class AclDisableDirective extends AclAttributedBaseDirective implements OnDestroy {

  @Input('fsAclDisable')
  set fsAclDisabled(value) {
    this._requestedPermissions = isArray(value) ? value : [value];
  }

  @Input('fsAclObject')
  set fsAclFullObject(value) {
    this._permissionObject = value;
  }

  @Input('fsAclRequire')
  protected _require = AclRequire.Any;

  constructor(
    protected _aclQuery: FsAclQueryService,
    @Optional() protected _ngControl: NgControl,
  ) {
    super(_aclQuery);
  }

  protected _checkPermissions() {
    const valid = this._aclQuery.canWrite(
      this._requestedPermissions,
      this._permissionObject,
      this._require
    );

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
