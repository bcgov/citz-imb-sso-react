import { OriginalSSOUser, SSOUser } from '../types';

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
  let guid;
  let username;
  let first_name;
  let last_name;

  switch (identity_provider) {
    case 'idir':
    case 'azureidir':
      // IDIR
      guid = userInfo?.idir_user_guid ?? '';
      username = userInfo?.idir_username ?? '';
      first_name = userInfo?.given_name ?? '';
      last_name = userInfo?.family_name ?? '';
      break;
    case 'bceidbasic':
    case 'bceidboth':
    case 'bceidbusiness':
      // BCeID
      guid = userInfo?.bceid_user_guid ?? '';
      username = userInfo?.bceid_username ?? '';
      first_name = userInfo?.display_name.split(' ')[0] ?? '';
      last_name = userInfo?.display_name.split(' ')[1] ?? '';
      break;
    case 'githubbcgov':
    case 'githubpublic':
      // GitHub
      guid = userInfo?.github_id ?? '';
      username = userInfo?.github_username ?? '';
      first_name = userInfo?.display_name.split(' ')[0] ?? '';
      last_name = userInfo?.display_name.split(' ')[1] ?? '';
      break;
    default:
      guid = userInfo?.preferred_username.split('@').at(0) ?? '';
      username = userInfo?.preferred_username ?? '';
      first_name = userInfo?.given_name ?? '';
      last_name = userInfo?.family_name ?? '';
      break;
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
