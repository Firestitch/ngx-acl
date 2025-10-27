import { Directive, OnDestroy, inject } from '@angular/core';
import { NgControl } from '@angular/forms';


import { AclAttributedBaseDirective } from './acl-attributed-base.directive';


@Directive({
  selector: '[fsAclDisable]',
  inputs: [
    'AclPermissionParams: fsAclDisable',
    '_permissionObject: fsAclObject',
    '_require: fsAclRequire',
  ],
  standalone: true,
})
export class AclDisableDirective extends AclAttributedBaseDirective implements OnDestroy {
 
  protected _ngControl = inject(NgControl, { optional: true });

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
