import { Component } from '@angular/core';
import { AclRequire } from '@firestitch/acl';
import { Permission } from '../enums/permission';


@Component({
  selector: 'app-attribute',
  templateUrl: 'attribute.component.html',
  styleUrls: ['attribute.component.scss']
})
export class AttributeComponent {

  public Permission = Permission;
  public AclRequire = AclRequire;
  public validProject = { id: 555 };
  public invalidProject = { id: 999 };
  public enabled;
  public disabled;
  public editable;
}
