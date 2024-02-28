/**
 * Decodes a JSON Web Token (JWT) and returns the payload object.
 * @param {string} jwt - The JWT string to be decoded.
 * @returns {Object} - The decoded payload object.
 */
export const decodeJWT = (jwt: string) => {
  const base64Url = jwt.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

  const decodedData = window.atob(base64);

  try {
    return JSON.parse(decodedData);
  } catch (error) {
    console.error('Error: Failed to parse JWT:', error);
  }
};

// Checks if user has all the roles in the requiredRoles array.
export const hasAllRoles = (userRoles: string[], requiredRoles: string[]) =>
  requiredRoles.every((role) => userRoles.includes(role));

// Checks if user has at least one role in requiredRoles array.
export const hasAtLeastOneRole = (userRoles: string[], requiredRoles: string[]) =>
  requiredRoles.some((role) => userRoles.includes(role));
