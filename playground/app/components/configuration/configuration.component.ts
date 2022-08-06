import { Component } from '@angular/core';
import { FsAcl, AclAccess, AclAccesses, AclEntry } from '@firestitch/acl';
import { Permission } from '../enums/permission';
import { Permissions } from '../consts/permissions';


@Component({
  selector: 'app-configuration',
  templateUrl: 'configuration.component.html',
  styleUrls: ['configuration.component.scss'],
})
export class ConfigurationComponent {

  public Permission = Permission;
  public Accesses = AclAccesses;
  public Permissions = Permissions;
  public validProject = { id: 555 };

  public entries = [
    {
      objectId: null,
      permission: Permission.Project,
      access: AclAccess.Full,
    },
    {
      objectId: this.validProject.id,
      permission: Permission.ProjectApproval,
      access: AclAccess.Full,
    },    
    {
      objectId: this.validProject.id,
      permission: Permission.Project,
      access: AclAccess.Full,
    },
  ];


  constructor(private _acl: FsAcl) {
    this.change();
  }

  public change() {
    const aclEntries: AclEntry[] = Object.values(this.entries
    .reduce((accum, aclEntry) => {

      if(!accum[aclEntry.objectId]) {
        accum[aclEntry.objectId] = {
          objectId: aclEntry.objectId ? Number(aclEntry.objectId) : null,
          permissions: [],
        }
      }

      accum[aclEntry.objectId].permissions
      .push({
        value: aclEntry.permission,
        access: aclEntry.access,
      });

      return accum;
    }, {}));

    this._acl.setEntries(aclEntries);
  }
}
