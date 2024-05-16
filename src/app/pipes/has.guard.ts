import { Pipe, PipeTransform } from '@angular/core';

import { AclPermissionParam } from '../interfaces';
import { FsAcl } from '../services';


@Pipe({ name: 'fsAclHas' })
export class FsAclHasPipe implements PipeTransform {

  constructor(
    protected _aclQuery: FsAcl
  ) {}

  public transform(permissionParam: AclPermissionParam): boolean {
    return this._aclQuery.has(permissionParam);
  }
}
