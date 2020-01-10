import {
  EmbeddedViewRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FsAclQueryService } from '../../services/acl-query.service';


export class AclStructuredBaseDirective implements OnChanges, OnDestroy {

  protected _context = {
    $implicit: null,
  };

  protected _permissionObject = null;
  protected _predicate = 'OR';

  protected _requestedPermissions: string[] = [];

  protected _thenTemplateRef: TemplateRef<any>;
  protected _elseTemplateRef: TemplateRef<any>;

  protected _thenViewRef: EmbeddedViewRef<any>;
  protected _elseViewRef: EmbeddedViewRef<any>;

  protected _destroy$ = new Subject<void>();

  constructor(
    protected _tempalteRef: TemplateRef<null>,
    protected _viewContainerRef: ViewContainerRef,
    protected _aclQuery: FsAclQueryService
  ) {
    this._thenTemplateRef = _tempalteRef;

    this._listenPermissionsChange();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    this._checkPermissions();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();

    this._clear();
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

  protected _updateView() {
    if (this._context.$implicit) {
      if (!this._thenViewRef) {
        this._viewContainerRef.clear();
        this._elseViewRef = null;

        if (this._thenTemplateRef) {
          this._thenViewRef = this._viewContainerRef.createEmbeddedView(this._thenTemplateRef);
        }
      }
    } else {
      if (!this._elseViewRef) {
        this._viewContainerRef.clear();
        this._thenViewRef = null;

        if (this._elseTemplateRef) {
          this._elseViewRef = this._viewContainerRef.createEmbeddedView(this._elseTemplateRef);
        }
      }
    }
  }

  protected _create() {}

  protected _clear() {

    this._viewContainerRef.clear();
  }
}
