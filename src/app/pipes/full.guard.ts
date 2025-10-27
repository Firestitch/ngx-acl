import { Pipe, PipeTransform, inject } from '@angular/core';

import { AclPermissionParam } from '../interfaces';
import { FsAcl } from '../services';


@Pipe({
    name: 'fsAclFull',
    standalone: true
})
export class FsAclFullPipe implements PipeTransform {
  protected _aclQuery = inject(FsAcl);


  public transform(permissionParam: AclPermissionParam): boolean {
    return this._aclQuery.hasFull(permissionParam);
  }
}
