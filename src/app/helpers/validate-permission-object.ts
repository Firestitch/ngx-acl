export function validatePermissionObject(object: unknown, permission?: unknown): void {
  if (object !== null
    && object !== undefined
    && typeof object !== 'number'
  ) {
    console.warn(`permission.object should be "number", but "${typeof object}" received: `, permission);
  }
}
