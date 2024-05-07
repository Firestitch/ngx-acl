import { NgModule } from '@angular/core';

import { AclDisableDirective } from './directives/attributed/acl-disable.directive';
import { AclEnableDirective } from './directives/attributed/acl-enable.directive';
import { AclHasDirective } from './directives/structured';
import { AclFullDirective } from './directives/structured/acl-full.directive';
import { AclNotFullDirective } from './directives/structured/acl-not-full.directive';
import { AclNotReadDirective } from './directives/structured/acl-not-read.directive';
import { AclNotWriteDirective } from './directives/structured/acl-not-write.directive';
import { AclReadDirective } from './directives/structured/acl-read.directive';
import { AclWriteDirective } from './directives/structured/acl-write.directive';


@NgModule({
  declarations: [
    AclReadDirective,
    AclWriteDirective,
    AclFullDirective,
    AclNotReadDirective,
    AclNotWriteDirective,
    AclNotFullDirective,
    AclDisableDirective,
    AclEnableDirective,
    AclHasDirective,
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
    AclHasDirective,
  ]
})
export class FsAclModule {}
