export function generatePermissions(permission: string, objects: number[]) {

  if (!objects) {
    return [{
      permission: permission,
      objectId: null,
    }];
  }

  return objects.reduce((acc, object) => {
    acc.push({
      permission: permission,
      objectId: object,
    });

    return acc;
  }, []);
}
