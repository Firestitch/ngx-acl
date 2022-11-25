import { Component, OnInit } from '@angular/core';

import { AclAccesses, FsAcl } from '@firestitch/acl';

import { Permission } from '../enums/permission';


@Component({
  selector: 'kitchen-sink',
  templateUrl: 'kitchen-sink.component.html',
  styleUrls: ['kitchen-sink.component.scss'],
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
