// Checks if user has all the roles in the requiredRoles array.
export const hasAllRoles = (userRoles: string[], requiredRoles: string[]) =>
  requiredRoles.every((role) => userRoles.includes(role));

// Checks if user has at least one role in requiredRoles array.
export const hasAtLeastOneRole = (userRoles: string[], requiredRoles: string[]) =>
  requiredRoles.some((role) => userRoles.includes(role));
