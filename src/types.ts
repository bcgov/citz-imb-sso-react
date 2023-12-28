import { Dispatch, ReactNode } from "react";
import { AuthActionType } from "./state/reducer";

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

export type IdirIdentityProvider = "idir";
export type GithubIdentityProvider = "githubbcgov" | "githubpublic";
export type BceidIdentityProvider =
  | "bceidbasic"
  | "bceidbusiness"
  | "bceidboth";
export type IdentityProvider =
  | IdirIdentityProvider
  | BceidIdentityProvider
  | GithubIdentityProvider;

export type HasRoleOptions = {
  requireAllRoles?: boolean;
};

export type AuthService = {
  state: AuthState;
  getAuthorizationHeaderValue: () => string;
  hasRole: (roles: string[], options?: HasRoleOptions) => boolean;
  isAuthenticated: boolean;
  refreshToken: (backendURL?: string) => Promise<void>;
  login: (options?: LoginProps) => void;
  logout: (backendURL?: string) => void;
};

export type AuthAction = {
  type: AuthActionType;
  payload?: {
    accessToken?: string;
    idToken?: string;
    userInfo?: Record<string, any>;
  };
};

export type AuthState = {
  accessToken?: string;
  idToken?: string;
  userInfo?: Record<string, any>;
};

export type AuthStateWithDispatch = {
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
};
