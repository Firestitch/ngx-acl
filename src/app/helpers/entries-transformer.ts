import { AclEntry, AclPermission } from '../interfaces/acl-entry';
import { AclStoreEntry } from '../interfaces/acl-store';
import { AclAccess } from '../enums/acl-access.enum';


export function entriesToStore(entries: AclEntry[]): Map<string, AclStoreEntry> {
  const store = new Map<string, AclStoreEntry>();

  entries.forEach((entry) => {
    entry.permissions.forEach((permission) => {
      addPermissionToStore(store, entry.objectId, permission);
    })
  });

  return store;
}

function addPermissionToStore(store: Map<string, AclStoreEntry>, objectId: number, permission: AclPermission) {
  if (!store.has(permission.value)) {
    store.set(permission.value, new Map<number, AclAccess>());
  }

  const objectsList = store.get(permission.value);

  objectsList.set(objectId, permission.access);
}
