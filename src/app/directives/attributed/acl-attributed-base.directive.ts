import { OnChanges, OnDestroy, SimpleChanges, Directive } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FsAcl } from '../../services/acl.service';
import { AclRequire } from '../../enums/acl-require.enum';
import { AclPermissionParam } from '../../interfaces/acl-permission-param';
import { AclDirectivePermissions } from '../../interfaces/acl-directive-permissions';
import { prepareRequestedPermissions } from '../../helpers/prepare-requested-permissions';


@Directive()
export abstract class AclAttributedBaseDirective implements OnChanges, OnDestroy {

  protected _permissionObject: number | number[];
  protected _require = AclRequire.Any;
  protected _hasValidAccess = false;
  protected _requestedPermissions: AclPermissionParam = [];

  protected _destroy$ = new Subject<void>();

  protected constructor(protected _aclQuery: FsAcl) {
    this._listenPermissionsChange();
  }

  public set AclPermissionParams(value: AclDirectivePermissions) {
    this._requestedPermissions = prepareRequestedPermissions(value);
  }

  protected abstract _checkPermissions(): void;

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
      this._require
    );
  }
}
