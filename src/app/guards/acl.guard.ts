import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChild
} from '@angular/router';
import { Injectable } from '@angular/core';

import { FsAclQueryService } from '../services/acl-query.service';
import { AclRequire } from '../enums/acl-require.enum';


@Injectable()
export class FsAclGuard implements CanActivate, CanActivateChild {

  constructor(private _aclQueryService: FsAclQueryService, private _router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this._canActivate(next.data.acl)) {
      return true;
    } else {
      // navigate to not found page
      this._router.navigate(['/notfound']);
      return false;
    }
  }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this._canActivate(next.data.acl)) {
      return true;
    } else {
      // navigate to not found page
      this._router.navigate(['/notfound']);
      return false;
    }
  }

  private _canActivate(routeAcl) {

    if (!routeAcl) {
      return true;
    }

    let aclRequire = AclRequire.Any;
    if (routeAcl.predicate) {
      aclRequire = routeAcl.predicate;
    }

    let canActivate = true;

    if (routeAcl.read && Array.isArray(routeAcl.read)) {
      canActivate = this._aclQueryService.canRead(routeAcl.read, null, aclRequire);
    }

    if (canActivate && routeAcl.write && Array.isArray(routeAcl.write)) {
      canActivate = canActivate && this._aclQueryService.canWrite(routeAcl.write, null, aclRequire);
    }

    if (canActivate && routeAcl.full && Array.isArray(routeAcl.full)) {
      canActivate = canActivate && this._aclQueryService.canFull(routeAcl.full, null, aclRequire);
    }

    return canActivate;
  }

}
