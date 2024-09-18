/* eslint-disable no-unused-vars */
import { Dispatch, ReactNode } from 'react';
import { AuthActionType } from './state/reducer';

// PROPS
export type SSOProviderProps = {
  backendURL?: string;
  idpHint?: IdentityProvider;
  children: ReactNode;
  onRefreshExpiry?: Function;
  overrideShowRefreshExpiryDialog?: boolean;
  postLoginRedirectURL?: string;
  refreshExpiresInOffset?: number;
};
export type SSOWrapperProps = {
  backendURL?: string | undefined;
  children: ReactNode;
  onRefreshExpiry?: Function;
  refreshExpiresInOffset?: number | undefined;
};
export type LoginProps = {
  backendURL?: string | undefined;
  idpHint?: IdentityProvider | undefined;
  postLoginRedirectURL?: string | undefined;
};
export type RefreshExpiryDialogProps = {
  isVisible: boolean;
  loginProps?: LoginProps;
};

export type IdirIdentityProvider = 'idir'| 'azureidir';
export type GithubIdentityProvider = 'githubbcgov' | 'githubpublic';
export type BceidIdentityProvider = 'bceidbasic' | 'bceidbusiness' | 'bceidboth';
// BC Services Card uses SSO_CLIENT_ID as the provider.

export type IdentityProvider =
  | IdirIdentityProvider
  | BceidIdentityProvider
  | GithubIdentityProvider;

export type HasRolesOptions = {
  requireAllRoles?: boolean;
};

export interface CustomRequestInit extends RequestInit {
  headers?: Record<string, string>;
}

export type AuthService = {
  state: AuthState;
  isAuthenticated: boolean;
  isLoggingIn: boolean;
  user?: SSOUser | undefined;
  getAuthorizationHeaderValue: () => string;
  fetchProtectedRoute: (url: string, options?: CustomRequestInit) => Promise<Response>;
  hasRoles: (roles: string[], options?: HasRolesOptions) => boolean;
  refreshToken: (backendURL?: string) => Promise<void>;
  login: (options?: LoginProps) => void;
  logout: (backendURL?: string) => void;
};

export type AuthAction = {
  type: AuthActionType;
  payload?: {
    accessToken?: string;
    idToken?: string;
    userInfo?: OriginalSSOUser;
  };
};

export type AuthState = {
  accessToken?: string | undefined;
  idToken?: string | undefined;
  userInfo?: OriginalSSOUser | undefined;
};

export type AuthStateWithDispatch = {
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
};

export type BaseSSOUser = {
  name?: string;
  preferred_username: string;
  email: string;
  display_name: string;
  client_roles?: string[];
  scope?: string;
  identity_provider: IdirIdentityProvider | BceidIdentityProvider | GithubIdentityProvider;
};

export type SSOIdirUser = {
  idir_user_guid?: string;
  idir_username?: string;
  given_name?: string;
  family_name?: string;
};

export type SSOBCeIDUser = {
  bceid_user_guid?: string;
  bceid_username?: string;
  bceid_business_name?: string;
};

export type SSOGithubUser = {
  github_id?: string;
  github_username?: string;
  orgs?: string;
  given_name?: string;
  family_name?: string;
  first_name?: string;
  last_name?: string;
};

export type SSOBcServicesCardUser = {
  given_name?: string;
  family_name?: string;
  first_name?: string;
}

export type OriginalSSOUser = BaseSSOUser & SSOIdirUser & SSOBCeIDUser & SSOGithubUser & SSOBcServicesCardUser;

export type SSOUser = BaseSSOUser & {
  guid: string;
  username: string;
  first_name: string;
  last_name: string;
  originalData: OriginalSSOUser;
};
