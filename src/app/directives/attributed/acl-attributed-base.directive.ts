import {
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FsAclQueryService } from '../../services/acl-query.service';


export class AclAttributedBaseDirective implements OnChanges, OnDestroy {

  @Input('aclObject')
  protected _permissionObject;

  @Input('aclPredicate')
  protected _predicate = 'OR';

  protected _hasValidAccess = false;
  protected _requestedPermissions: string[] = [];

  protected _destroy$ = new Subject<void>();

  constructor(protected _aclQuery: FsAclQueryService) {
    this._listenPermissionsChange();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this._checkPermissions();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  protected _checkPermissions() {}

  protected _listenPermissionsChange() {
    this._aclQuery.permissionsChange$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this._checkPermissions();
      });
  }
}
