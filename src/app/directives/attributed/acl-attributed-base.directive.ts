import {
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
  OnInit,
} from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FsAclQueryService } from '../../services/acl-query.service';
import { AclRequire } from 'src/app/enums/acl-require.enum';


 export abstract class AclAttributedBaseDirective implements OnChanges, OnDestroy {

  @Input('aclObject')
  protected _permissionObject;

  @Input('aclRequire')
  protected _require = AclRequire.Any;

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

  protected abstract _checkPermissions();

  protected _listenPermissionsChange() {
    this._aclQuery.permissions$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this._checkPermissions();
      });
  }
}
