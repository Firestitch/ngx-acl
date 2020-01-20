import { Component } from '@angular/core';
import { FsAcl, AclAccess, AclAccesses, AclEntry } from '@firestitch/acl';
import { Permission } from '../enums/permission';
import { Permissions } from '../consts/permissions';
import { toNumber } from 'lodash-es';


@Component({
  selector: 'app-configuration',
  templateUrl: 'configuration.component.html',
  styleUrls: ['configuration.component.scss']
})
export class ConfigurationComponent {

  public Permission = Permission;
  public Accesses = AclAccesses;
  public Permissions = Permissions;
  public validProject = { id: 555 };
  public permissions = [
    {
      permission: Permission.Project,
      access: AclAccess.Full,
      object: this.validProject.id
    },
    {
      permission: Permission.ProjectApproval,
      access: AclAccess.Full,
      object: this.validProject.id
    },
    {
      permission: Permission.Project,
      access: AclAccess.Full,
      object: null
    }
  ];

  constructor(private _acl: FsAcl) {
    this.change();
  }

  public change() {

    const aclEntries: AclEntry[] = this.permissions.map(item => {
      item.object = item.object ? toNumber(item.object) : null;
      return item;
    });

    this._acl.setEntries(aclEntries);
  }
}
