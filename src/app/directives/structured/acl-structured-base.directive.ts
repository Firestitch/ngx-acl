import {
  EmbeddedViewRef,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
  Directive,
} from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FsAcl } from '../../services/acl.service';
import { AclPermissionParam } from '../../interfaces/acl-permission-param';
import { AclDirectivePermissions } from '../../interfaces/acl-directive-permissions';
import { prepareRequestedPermissions } from '../../helpers/prepare-requested-permissions';
import { AclRequire } from '../../enums/acl-require.enum';


@Directive()
export abstract class AclStructuredBaseDirective implements OnChanges, OnDestroy {

  protected abstract _checkPermissions(): boolean;

  protected _permissionObject: number | number[] = null;
  protected _require: AclRequire = AclRequire.Any;

  protected _requestedPermissions: AclPermissionParam = [];

  protected _thenTemplateRef: TemplateRef<any>;
  protected _elseTemplateRef: TemplateRef<any>;

  protected _thenViewRef: EmbeddedViewRef<any>;
  protected _elseViewRef: EmbeddedViewRef<any>;

  protected _destroy$ = new Subject<void>();

  protected constructor(
    protected _tempalteRef: TemplateRef<null>,
    protected _viewContainerRef: ViewContainerRef,
    protected _aclQuery: FsAcl
  ) {
    this._thenTemplateRef = _tempalteRef;
    this._listenPermissionsChange();
  }

  public set AclPermissionParams(value: AclDirectivePermissions) {
    this._requestedPermissions = prepareRequestedPermissions(value);
  }

  public set aclThen(value: TemplateRef<any>) {
    this._thenTemplateRef = value;
    this._thenViewRef = null;
  }

  public set aclElse(value: TemplateRef<any>) {
    this._elseTemplateRef = value;
    this._elseViewRef = null;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this._updateView();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    this._clear();
  }

  protected _listenPermissionsChange() {
    this._aclQuery.entries$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this._updateView();
      });
  }

  protected _updateView() {

    if (this._checkPermissions()) {
      if (!this._thenViewRef) {
        this._clear();
        this._elseViewRef = null;

        if (this._thenTemplateRef) {
          this._thenViewRef = this._viewContainerRef.createEmbeddedView(this._thenTemplateRef);
        }
      }
    } else {
      if (!this._elseViewRef) {
        this._clear();
        this._thenViewRef = null;

        if (this._elseTemplateRef) {
          this._elseViewRef = this._viewContainerRef.createEmbeddedView(this._elseTemplateRef);
        }
      }
    }
  }

  protected _clear() {
    this._viewContainerRef.clear();
  }
}
