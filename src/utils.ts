import { OriginalSSOUser, SSOUser } from './types';

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

// Combine properties of each user type into a single object
export const normalizeUser = (userInfo: OriginalSSOUser): SSOUser => {
  const {
    name = '',
    preferred_username,
    email,
    display_name,
    client_roles = [],
    scope = '',
    identity_provider,
  } = userInfo;

  // Normalize properties
  let guid = userInfo?.idir_user_guid ?? '';
  let username = userInfo?.idir_username ?? '';
  let first_name = userInfo?.given_name ?? '';
  let last_name = userInfo?.family_name ?? '';

  if (
    identity_provider === 'bceidbasic' ||
    identity_provider === 'bceidbusiness' ||
    identity_provider === 'bceidboth'
  ) {
    // BCeID
    guid = userInfo?.bceid_user_guid ?? '';
    username = userInfo?.bceid_username ?? '';
    first_name = userInfo?.display_name.split(' ')[0];
    last_name = userInfo?.display_name.split(' ')[1];
  } else if (identity_provider === 'githubbcgov' || identity_provider === 'githubpublic') {
    // GitHub
    guid = userInfo?.github_id ?? '';
    username = userInfo?.github_username ?? '';
    first_name = userInfo?.display_name.split(' ')[0];
    last_name = userInfo?.display_name.split(' ')[1];
  }

  // Normalized user
  const user = {
    guid,
    preferred_username,
    username,
    email,
    name,
    display_name,
    first_name,
    last_name,
    client_roles,
    scope,
    identity_provider,
    originalData: userInfo,
  };

  return user;
};
