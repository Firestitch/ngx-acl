import { ModuleWithProviders, NgModule } from '@angular/core';

import { AclReadDirective } from './directives/structured/acl-read.directive';
import { AclWriteDirective } from './directives/structured/acl-write.directive';
import { AclFullDirective } from './directives/structured/acl-full.directive';
import { AclDisableDirective } from './directives/attributed/acl-disable.directive';
import { AclEnableDirective } from './directives/attributed/acl-enable.directive';
import { AclEditableDirective } from './directives/attributed/acl-editable.directive';

import { FsAcl } from './services/acl.service';
import { FsAclCache } from './services/acl-cache.service';

import { FsAclGuard } from './guards/acl.guard';


@NgModule({
  imports: [],
  declarations: [
    AclReadDirective,
    AclWriteDirective,
    AclFullDirective,
    AclDisableDirective,
    AclEnableDirective,
    AclEditableDirective,
  ],
  exports: [
    AclReadDirective,
    AclWriteDirective,
    AclFullDirective,
    AclDisableDirective,
    AclEnableDirective,
    AclEditableDirective,
  ]
})
export class FsAclModule {
  static forRoot(): ModuleWithProviders<FsAclModule> {
    return {
      ngModule: FsAclModule,
      providers: [
        FsAcl,
        FsAclGuard,
        FsAclCache,
      ]
    };
  }
}
