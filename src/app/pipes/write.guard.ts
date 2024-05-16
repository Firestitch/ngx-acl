import { Pipe, PipeTransform } from '@angular/core';

import { AclPermissionParam } from '../interfaces';
import { FsAcl } from '../services';


@Pipe({ name: 'fsAclWrite' })
export class FsAclWritePipe implements PipeTransform {

  constructor(
    protected _aclQuery: FsAcl
  ) {}

  public transform(permissionParam: AclPermissionParam): boolean {
    return this._aclQuery.hasWrite(permissionParam);
  }
}
