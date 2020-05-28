import { async } from '@angular/core/testing';
import { FsAcl } from './acl.service';
import { AclAccess, AclRequire } from '@firestitch/acl';
import { Permission } from '../../../playground/app/components/enums';

describe('AclService', () => {
  let aclInstance: FsAcl;

  beforeEach(async(() => {
    aclInstance = new FsAcl();

    aclInstance.setEntries([
      {
        objectId: null,
        permissions: [
          {
            value: Permission.Project,
            access: AclAccess.Read,
          },
          {
            value: Permission.ProjectApproval,
            access: AclAccess.Full,
          },
        ],
      },
      {
        objectId: 555,
        permissions: [
          {
            value: Permission.Project,
            access: AclAccess.Full,
          },
        ],
      },
    ]);
  }));


  it('should have read permissions for Project', () => {
    const has = aclInstance.has(Permission.Project, AclAccess.Read)

    expect(has).toBeTruthy();
  });

  it('shouldn\'t have write permissions for Project', () => {
    const has = aclInstance.has(Permission.Project, AclAccess.Write)

    expect(has).toBeFalsy();
  });

  it('shouldn\'t have full permissions for Project', () => {
    const has = aclInstance.has(Permission.Project, AclAccess.Full)

    expect(has).toBeFalsy();
  });

  it('should have read permissions for Project with ID = 555', () => {
    const has = aclInstance.has(Permission.Project, AclAccess.Read, [555])

    expect(has).toBeTruthy();
  });

  it('should have write permissions for Project with ID = 555', () => {
    const has = aclInstance.has(Permission.Project, AclAccess.Write, [555])

    expect(has).toBeTruthy();
  });

  it('should have full permissions for Project with ID = 555', () => {
    const has = aclInstance.has(Permission.Project, AclAccess.Full, [555])

    expect(has).toBeTruthy();
  });

  it('has Project or ProjectApproval write for Project with ID = 555', () => {
    const has = aclInstance.has(
      [Permission.Project, Permission.ProjectApproval],
      AclAccess.Write,
      [555]
    )

    expect(has).toBeTruthy();
  });

  it('hasn\'t Project and ProjectApproval write for Project with ID = 555', () => {
    const has = aclInstance.has(
      [Permission.Project, Permission.ProjectApproval],
      AclAccess.Write,
      [555],
      AclRequire.All,
    )

    expect(has).toBeFalsy();
  });
});

