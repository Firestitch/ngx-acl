import { Pipe, PipeTransform } from '@angular/core';

import { AclPermissionParam } from '../interfaces';
import { FsAcl } from '../services';


@Pipe({ name: 'fsAclRead' })
export class FsAclReadPipe implements PipeTransform {

  constructor(
    protected _aclQuery: FsAcl
  ) {}

  public transform(permissionParam: AclPermissionParam): boolean {
    return this._aclQuery.hasRead(permissionParam);
  }
}
