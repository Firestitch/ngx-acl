import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AclAccesses } from '@firestitch/acl';

import { FsAclFullPipe } from '../../../../src/app/pipes/full.guard';
import { FsAclHasPipe } from '../../../../src/app/pipes/has.guard';
import { FsAclReadPipe } from '../../../../src/app/pipes/read.guard';
import { FsAclWritePipe } from '../../../../src/app/pipes/write.guard';
import { Permission } from '../enums/permission';


@Component({
  selector: 'kitchen-sink',
  templateUrl: './kitchen-sink.component.html',
  styleUrls: ['./kitchen-sink.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    FsAclHasPipe,
    FsAclWritePipe,
    FsAclReadPipe,
    FsAclFullPipe,
  ],
})
export class KitchenSinkComponent {

  public Permission = Permission;
  public Accesses = AclAccesses;
  public validProject = { id: 555 };
  public invalidProject = { id: 999 };

}
