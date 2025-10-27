import { Pipe, PipeTransform, inject } from '@angular/core';

import { AclPermissionParam } from '../interfaces';
import { FsAcl } from '../services';


@Pipe({
    name: 'fsAclWrite',
    standalone: true
})
export class FsAclWritePipe implements PipeTransform {
  protected _aclQuery = inject(FsAcl);


  public transform(permissionParam: AclPermissionParam): boolean {
    return this._aclQuery.hasWrite(permissionParam);
  }
}
