import { ModuleWithProviders, NgModule } from '@angular/core';

import { AclReadDirective } from './directives/structured/acl-read.directive';
import { AclWriteDirective } from './directives/structured/acl-write.directive';
import { AclFullDirective } from './directives/structured/acl-full.directive';
import { AclDisabledDirective } from './directives/attributed/acl-disabled.directive';
import { AclEnabledDirective } from './directives/attributed/acl-enabled.directive';
import { AclEditableDirective } from './directives/attributed/acl-editable.directive';

import { FsAclQueryService } from './services/acl-query.service';

import { FsAclGuard } from './guards/acl.guard';


@NgModule({
  declarations: [
    AclReadDirective,
    AclWriteDirective,
    AclFullDirective,
    AclDisabledDirective,
    AclEnabledDirective,
    AclEditableDirective,
  ],
  exports: [
    AclReadDirective,
    AclWriteDirective,
    AclFullDirective,
    AclDisabledDirective,
    AclEnabledDirective,
    AclEditableDirective,
  ]
})
export class FsAclModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsAclModule,
      providers: [
        FsAclQueryService,
        FsAclGuard,
      ]
    };
  }
}
