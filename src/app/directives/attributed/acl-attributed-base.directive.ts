import { Directive, OnChanges, OnDestroy, SimpleChanges, inject } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AclRequire } from '../../enums/acl-require.enum';
import { prepareRequestedPermissions } from '../../helpers/prepare-requested-permissions';
import { AclDirectivePermissions } from '../../interfaces/acl-directive-permissions';
import { AclPermissionParam } from '../../interfaces/acl-permission-param';
import { FsAcl } from '../../services/acl.service';


@Directive()
export abstract class AclAttributedBaseDirective implements OnChanges, OnDestroy {

  protected _permissionObject: number | number[];
  protected _require = AclRequire.Any;
  protected _hasValidAccess = false;
  protected _requestedPermissions: AclPermissionParam = [];
  protected _aclQuery = inject(FsAcl);

  private _destroy$ = new Subject<void>();

  constructor() {
    this._listenPermissionsChange();
  }

  public set AclPermissionParams(value: AclDirectivePermissions) {
    this._requestedPermissions = prepareRequestedPermissions(value);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this._checkPermissions();
  }

  public ngOnDestroy(): void {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  protected _listenPermissionsChange() {
    this._aclQuery.entries$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this._checkPermissions();
      });
  }

  protected _checkAclPermissions(): boolean {
    return this._aclQuery.hasWrite(
      this._requestedPermissions,
      this._permissionObject,
      this._require,
    );
  }
  
  protected abstract _checkPermissions(): void;

}
