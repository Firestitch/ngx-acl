import { Component } from '@angular/core';
import { AclRequire } from '@firestitch/acl';
import { Permission } from '../enums/permission';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatHint } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { AclEnableDirective } from '../../../../src/app/directives/attributed/acl-enable.directive';
import { AclDisableDirective } from '../../../../src/app/directives/attributed/acl-disable.directive';


@Component({
    selector: 'app-attribute',
    templateUrl: 'attribute.component.html',
    styleUrls: ['attribute.component.scss'],
    standalone: true,
    imports: [FormsModule, MatFormField, MatInput, AclEnableDirective, MatHint, AclDisableDirective]
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
