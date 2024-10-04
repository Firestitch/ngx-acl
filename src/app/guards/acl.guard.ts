import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { FsAcl } from '../services/acl.service';
import { AclRequire } from '../enums/acl-require.enum';


@Injectable({
  providedIn: 'root',
})
export class FsAclGuard  {

  public constructor(private _aclQueryService: FsAcl, private _router: Router) {}

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this._canActivate(next.data.acl)) {
      return true;
    } else {
      // navigate to not found page
      this._router.navigate(['/notfound']);
      return false;
    }
  }

  public canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

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
      canActivate = this._aclQueryService.hasRead(routeAcl.read, null, aclRequire);
    }

    if (canActivate && routeAcl.write && Array.isArray(routeAcl.write)) {
      canActivate = canActivate && this._aclQueryService.hasWrite(routeAcl.write, null, aclRequire);
    }

    if (canActivate && routeAcl.full && Array.isArray(routeAcl.full)) {
      canActivate = canActivate && this._aclQueryService.hasFull(routeAcl.full, null, aclRequire);
    }

    return canActivate;
  }

}
