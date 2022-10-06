import { AclEntry } from '@firestitch/acl';
import { AclEntriesList } from '../interfaces/acl-entris-list';

export function transformEntriers(aclEntries: AclEntry[]): AclEntriesList {
  const entries = new Map();

  aclEntries.forEach((entry) => {
    const objectId = entry.objectId;
    if (!entries.has(objectId)) {
      entries.set(objectId, new Map());
    }

    entry.permissions.forEach((permission) => {
      entries.get(objectId).set(permission.value, permission.access);
    });
  });

  return entries;
}
