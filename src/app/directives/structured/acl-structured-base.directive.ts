import {
  Directive,
  EmbeddedViewRef,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
  inject,
} from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AclRequire } from '../../enums/acl-require.enum';
import { prepareRequestedPermissions } from '../../helpers/prepare-requested-permissions';
import { AclDirectivePermissions } from '../../interfaces/acl-directive-permissions';
import { AclPermissionParam } from '../../interfaces/acl-permission-param';
import { FsAcl } from '../../services/acl.service';


@Directive()
export abstract class AclStructuredBaseDirective implements OnChanges, OnDestroy {

  protected _permissionObject: number | number[] = null;
  protected _require: AclRequire = AclRequire.Any;

  protected _requestedPermissions: AclPermissionParam = [];

  protected _thenTemplateRef: TemplateRef<any>;
  protected _elseTemplateRef: TemplateRef<any>;

  protected _thenViewRef: EmbeddedViewRef<any>;
  protected _elseViewRef: EmbeddedViewRef<any>;

  protected _aclQuery = inject(FsAcl);
  protected _tempalteRef = inject(TemplateRef);
  protected _viewContainerRef = inject(ViewContainerRef);

  private _destroy$ = new Subject<void>();

  protected constructor() {
    this._listenPermissionsChange();
  }

  protected abstract _checkPermissions(): boolean;


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
    this._destroy$.next(null);
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
