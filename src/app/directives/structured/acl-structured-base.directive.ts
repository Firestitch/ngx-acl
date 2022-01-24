import { EmbeddedViewRef, OnChanges, OnDestroy, SimpleChanges, TemplateRef, ViewContainerRef, Directive } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FsAcl } from '../../services/acl.service';

@Directive()
export abstract class AclStructuredBaseDirective implements OnChanges, OnDestroy {

  protected abstract _checkPermissions(): boolean;

  protected _permissionObject = null;

  protected _requestedPermissions: string[] = [];

  protected _thenTemplateRef: TemplateRef<any>;
  protected _elseTemplateRef: TemplateRef<any>;

  protected _thenViewRef: EmbeddedViewRef<any>;
  protected _elseViewRef: EmbeddedViewRef<any>;

  protected _destroy$ = new Subject<void>();

  constructor(
    protected _tempalteRef: TemplateRef<null>,
    protected _viewContainerRef: ViewContainerRef,
    protected _aclQuery: FsAcl
  ) {
    this._thenTemplateRef = _tempalteRef;
    this._listenPermissionsChange();
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
