import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { AclAccesses, FsAcl } from '@firestitch/acl';

import { Permission } from '../enums/permission';
import { AclFullDirective } from '../../../../src/app/directives/structured/acl-full.directive';
import { AclWriteDirective } from '../../../../src/app/directives/structured/acl-write.directive';
import { AclReadDirective } from '../../../../src/app/directives/structured/acl-read.directive';
import { AclNotFullDirective } from '../../../../src/app/directives/structured/acl-not-full.directive';
import { AclNotWriteDirective } from '../../../../src/app/directives/structured/acl-not-write.directive';
import { AclNotReadDirective } from '../../../../src/app/directives/structured/acl-not-read.directive';
import { NgIf } from '@angular/common';
import { FsAclHasPipe } from '../../../../src/app/pipes/has.guard';
import { FsAclWritePipe } from '../../../../src/app/pipes/write.guard';
import { FsAclReadPipe } from '../../../../src/app/pipes/read.guard';
import { FsAclFullPipe } from '../../../../src/app/pipes/full.guard';


@Component({
    selector: 'kitchen-sink',
    templateUrl: './kitchen-sink.component.html',
    styleUrls: ['./kitchen-sink.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        AclFullDirective,
        AclWriteDirective,
        AclReadDirective,
        AclNotFullDirective,
        AclNotWriteDirective,
        AclNotReadDirective,
        NgIf,
        FsAclHasPipe,
        FsAclWritePipe,
        FsAclReadPipe,
        FsAclFullPipe,
    ],
})
export class KitchenSinkComponent implements OnInit {

  public Permission = Permission;
  public Accesses = AclAccesses;
  public validProject = { id: 555 };
  public invalidProject = { id: 999 };

  public constructor(
    private _acl: FsAcl,
  ) {}

  public ngOnInit(): void {

  }

}
