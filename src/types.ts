/* eslint-disable no-unused-vars */
import { Dispatch, ReactNode } from 'react';
import { AuthActionType } from './state/reducer';

// PROPS
export type KeycloakProviderProps = {
  backendURL?: string;
  idpHint?: IdentityProvider;
  children: ReactNode;
  onRefreshExpiry?: Function;
};
export type KeycloakWrapperProps = {
  backendURL?: string;
  children: ReactNode;
  onRefreshExpiry?: Function;
};
export type LoginProps = {
  backendURL?: string;
  idpHint?: IdentityProvider;
};
export type RefreshExpiryDialogProps = {
  isVisible: boolean;
  loginProps?: LoginProps;
};

export type IdirIdentityProvider = 'idir';
export type GithubIdentityProvider = 'githubbcgov' | 'githubpublic';
export type BceidIdentityProvider = 'bceidbasic' | 'bceidbusiness' | 'bceidboth';
export type IdentityProvider =
  | IdirIdentityProvider
  | BceidIdentityProvider
  | GithubIdentityProvider;

export type HasRoleOptions = {
  requireAllRoles?: boolean;
};

export type AuthService = {
  state: AuthState;
  isAuthenticated: boolean;
  isLoggingIn: boolean;
  user?: KeycloakUser;
  getAuthorizationHeaderValue: () => string;
  fetchProtectedRoute: (url: string, options?: RequestInit) => Promise<Response>;
  hasRole: (roles: string[], options?: HasRoleOptions) => boolean;
  refreshToken: (backendURL?: string) => Promise<void>;
  login: (options?: LoginProps) => void;
  logout: (backendURL?: string) => void;
};

export type AuthAction = {
  type: AuthActionType;
  payload?: {
    accessToken?: string;
    idToken?: string;
    userInfo?: CombinedKeycloakUser;
  };
};

export type AuthState = {
  isLoggingIn: boolean;
  isAuthenticated: boolean;
  accessToken?: string;
  idToken?: string;
  userInfo?: CombinedKeycloakUser;
};

export type AuthStateWithDispatch = {
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
};

export type BaseKeycloakUser = {
  name?: string;
  preferred_username: string;
  email: string;
  display_name: string;
  client_roles?: string[];
  scope?: string;
  identity_provider: IdirIdentityProvider | BceidIdentityProvider | GithubIdentityProvider;
};

export type KeycloakIdirUser = {
  idir_user_guid?: string;
  idir_username?: string;
  given_name?: string;
  family_name?: string;
};

export type KeycloakBCeIDUser = {
  bceid_user_guid?: string;
  bceid_username?: string;
  bceid_business_name?: string;
};

export type KeycloakGithubUser = {
  github_id?: string;
  github_username?: string;
  orgs?: string;
  given_name?: string;
  family_name?: string;
  first_name?: string;
  last_name?: string;
};

export type CombinedKeycloakUser = BaseKeycloakUser &
  KeycloakIdirUser &
  KeycloakBCeIDUser &
  KeycloakGithubUser;

export type KeycloakUser = BaseKeycloakUser & {
  guid: string;
  username: string;
  first_name: string;
  last_name: string;
};
