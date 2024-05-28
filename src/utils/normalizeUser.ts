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
