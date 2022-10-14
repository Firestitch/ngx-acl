import { NgModule } from '@angular/core';

import { AclReadDirective } from './directives/structured/acl-read.directive';
import { AclWriteDirective } from './directives/structured/acl-write.directive';
import { AclFullDirective } from './directives/structured/acl-full.directive';
import { AclDisableDirective } from './directives/attributed/acl-disable.directive';
import { AclEnableDirective } from './directives/attributed/acl-enable.directive';
import { AclEditableDirective } from './directives/attributed/acl-editable.directive';
import { AclNotReadDirective } from './directives/structured/acl-not-read.directive';
import { AclNotWriteDirective } from './directives/structured/acl-not-write.directive';
import { AclNotFullDirective } from './directives/structured/acl-not-full.directive';


@NgModule({
  imports: [],
  declarations: [
    AclReadDirective,
    AclWriteDirective,
    AclFullDirective,
    AclNotReadDirective,
    AclNotWriteDirective,
    AclNotFullDirective,
    AclDisableDirective,
    AclEnableDirective,
    AclEditableDirective,
  ],
  exports: [
    AclReadDirective,
    AclWriteDirective,
    AclFullDirective,
    AclNotReadDirective,
    AclNotWriteDirective,
    AclNotFullDirective,
    AclDisableDirective,
    AclEnableDirective,
    AclEditableDirective,
  ]
})
export class FsAclModule {}
