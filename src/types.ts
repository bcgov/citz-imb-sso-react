import { Dispatch, ReactNode } from "react";
import { AuthActionType } from "./state/reducer";

// PROPS
export interface KeycloakProviderProps {
  backendURL?: string;
  children: ReactNode;
}
export interface KeycloakWrapperProps {
  backendURL?: string;
  children: ReactNode;
}
export interface LoginProps {
  backendURL?: string;
  idpHint?: IdentityProvider;
}

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

export interface AuthService {
  state: AuthState;
  getAuthorizationHeaderValue: () => string;
  hasRole: (roles: string[], options?: HasRoleOptions) => boolean;
  isAuthenticated: boolean;
  refreshToken: (backendURL?: string) => Promise<void>;
  login: (options?: LoginProps) => void;
  logout: (backendURL?: string) => void;
}

export interface AuthAction {
  type: AuthActionType;
  payload?: {
    accessToken?: string;
    idToken?: string;
    userInfo?: Record<string, any>;
  };
}

export interface AuthState {
  accessToken?: string;
  idToken?: string;
  userInfo?: Record<string, any>;
}

export interface AuthStateWithDispatch {
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
}
