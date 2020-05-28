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
  public entries = [
    {
      objectId: null,
      permissions: [
        {
          value: Permission.Project,
          access: AclAccess.Full,
        },
        {
          value: Permission.ProjectApproval,
          access: AclAccess.Full,
        },
      ],
    },
    {
      objectId: this.validProject.id,
      permissions: [
        {
          value: Permission.Project,
          access: AclAccess.Full,
        },
      ],
    },
  ];


  constructor(private _acl: FsAcl) {
    this.change();
  }

  public change() {

    const aclEntries: AclEntry[] = this.entries;

    this._acl.setEntries(aclEntries);
  }
}
