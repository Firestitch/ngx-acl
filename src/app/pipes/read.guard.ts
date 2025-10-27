import { Pipe, PipeTransform, inject } from '@angular/core';

import { AclPermissionParam } from '../interfaces';
import { FsAcl } from '../services';


@Pipe({
    name: 'fsAclRead',
    standalone: true
})
export class FsAclReadPipe implements PipeTransform {
  protected _aclQuery = inject(FsAcl);


  public transform(permissionParam: AclPermissionParam): boolean {
    return this._aclQuery.hasRead(permissionParam);
  }
}
