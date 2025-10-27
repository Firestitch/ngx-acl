import { Component, inject } from '@angular/core';
import { FsAcl, AclAccess, AclAccesses, AclEntry } from '@firestitch/acl';
import { Permission } from '../enums/permission';
import { Permissions } from '../consts/permissions';
import { MatFormField } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatInput } from '@angular/material/input';


@Component({
    selector: 'app-configuration',
    templateUrl: 'configuration.component.html',
    styleUrls: ['configuration.component.scss'],
    standalone: true,
    imports: [
        MatFormField,
        MatSelect,
        FormsModule,
        MatOption,
        MatInput,
    ],
})
export class ConfigurationComponent {
  private _acl = inject(FsAcl);


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


  constructor() {
    this.change();
  }

  public change() {
    const aclEntries: AclEntry[] = Object.values(this.entries
      .reduce((accum, aclEntry) => {
        if (!accum[aclEntry.objectId]) {
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
