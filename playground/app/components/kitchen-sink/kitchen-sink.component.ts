import { Component } from '@angular/core';
import { AclAccesses } from '@firestitch/acl';
import { Permission } from '../enums/permission';


@Component({
  selector: 'kitchen-sink',
  templateUrl: 'kitchen-sink.component.html',
  styleUrls: ['kitchen-sink.component.scss'],
})
export class KitchenSinkComponent {

  public Permission = Permission;
  public Accesses = AclAccesses;
  public validProject = { id: 555 };
  public invalidProject = { id: 999 };


}
