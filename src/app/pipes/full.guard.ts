import { Pipe, PipeTransform } from '@angular/core';

import { AclPermissionParam } from '../interfaces';
import { FsAcl } from '../services';


@Pipe({
    name: 'fsAclFull',
    standalone: true
})
export class FsAclFullPipe implements PipeTransform {

  constructor(
    protected _aclQuery: FsAcl
  ) {}

  public transform(permissionParam: AclPermissionParam): boolean {
    return this._aclQuery.hasFull(permissionParam);
  }
}
