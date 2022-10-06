import { Input, OnChanges, OnDestroy, SimpleChanges, Directive } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FsAcl } from '../../services/acl.service';
import { AclRequire } from '../../enums/acl-require.enum';
import { AclComplexPermission } from '../../interfaces/acl-complex-permission';


 @Directive()
export abstract class AclAttributedBaseDirective implements OnChanges, OnDestroy {

  @Input('aclObject')
  protected _permissionObject;

  @Input('aclRequire')
  protected _require = AclRequire.Any;

  protected _hasValidAccess = false;
  protected _requestedPermissions: (string | AclComplexPermission)[] = [];

  protected _destroy$ = new Subject<void>();

  constructor(protected _aclQuery: FsAcl) {
    this._listenPermissionsChange();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this._checkPermissions();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  protected abstract _checkPermissions();

  protected _listenPermissionsChange() {
    this._aclQuery.entries$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this._checkPermissions();
      });
  }
}
