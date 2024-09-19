# TypeScript Types

These are the complete TypeScript types available within the package as they are in the bundled build.

For more in depth documentation on types, look at the `APIs & Components` pages.

<!-- DO NOT REMOVE THE FOLLOWING LINES. -->
<!-- This code block is auto generated when types in the package change. -->

<!-- TYPESCRIPT TYPES -->
```TypeScript
import { ReactNode, Dispatch, Context } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

declare enum AuthActionType {
    LOGOUT = "LOGOUT",
    REFRESH_TOKEN = "REFRESH_TOKEN"
}
declare const initialState: AuthState;
declare const reducer: (state: AuthState, action: AuthAction) => AuthState;

type SSOProviderProps = {
    backendURL?: string;
    idpHint?: IdentityProvider;
    children: ReactNode;
    onRefreshExpiry?: Function;
    overrideShowRefreshExpiryDialog?: boolean;
    postLoginRedirectURL?: string;
    refreshExpiresInOffset?: number;
};
type SSOWrapperProps = {
    backendURL?: string | undefined;
    children: ReactNode;
    onRefreshExpiry?: Function;
    refreshExpiresInOffset?: number | undefined;
};
type LoginProps = {
    backendURL?: string | undefined;
    idpHint?: IdentityProvider | undefined;
    postLoginRedirectURL?: string | undefined;
};
type RefreshExpiryDialogProps = {
    isVisible: boolean;
    loginProps?: LoginProps;
};
type IdirIdentityProvider = 'idir' | 'azureidir';
type GithubIdentityProvider = 'githubbcgov' | 'githubpublic';
type BceidIdentityProvider = 'bceidbasic' | 'bceidbusiness' | 'bceidboth';
type IdentityProvider = IdirIdentityProvider | BceidIdentityProvider | GithubIdentityProvider;
type HasRolesOptions = {
    requireAllRoles?: boolean;
};
interface CustomRequestInit extends RequestInit {
    headers?: Record<string, string>;
}
type AuthService = {
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
type AuthAction = {
    type: AuthActionType;
    payload?: {
        accessToken?: string;
        idToken?: string;
        userInfo?: OriginalSSOUser;
    };
};
type AuthState = {
    accessToken?: string | undefined;
    idToken?: string | undefined;
    userInfo?: OriginalSSOUser | undefined;
};
type AuthStateWithDispatch = {
    state: AuthState;
    dispatch: Dispatch<AuthAction>;
};
type BaseSSOUser = {
    name?: string;
    preferred_username: string;
    email: string;
    display_name: string;
    client_roles?: string[];
    scope?: string;
    identity_provider: IdirIdentityProvider | BceidIdentityProvider | GithubIdentityProvider;
};
type SSOIdirUser = {
    idir_user_guid?: string;
    idir_username?: string;
    given_name?: string;
    family_name?: string;
};
type SSOBCeIDUser = {
    bceid_user_guid?: string;
    bceid_username?: string;
    bceid_business_name?: string;
};
type SSOGithubUser = {
    github_id?: string;
    github_username?: string;
    orgs?: string;
    given_name?: string;
    family_name?: string;
    first_name?: string;
    last_name?: string;
};
type SSOBcServicesCardUser = {
    given_name?: string;
    family_name?: string;
};
type OriginalSSOUser = BaseSSOUser & SSOIdirUser & SSOBCeIDUser & SSOGithubUser & SSOBcServicesCardUser;
type SSOUser = BaseSSOUser & {
    guid: string;
    username: string;
    first_name: string;
    last_name: string;
    originalData: OriginalSSOUser;
};

declare const AuthContext: Context<AuthStateWithDispatch>;

declare const SSOProvider: (props: SSOProviderProps) => react_jsx_runtime.JSX.Element;

declare const SSOWrapper: (props: SSOWrapperProps) => react_jsx_runtime.JSX.Element;

declare const useSSO: () => AuthService;

declare const decodeJWT: (jwt: string) => any;

declare const hasAllRoles: (userRoles: string[], requiredRoles: string[]) => boolean;
declare const hasAtLeastOneRole: (userRoles: string[], requiredRoles: string[]) => boolean;

declare const normalizeUser: (userInfo: OriginalSSOUser) => SSOUser;

declare const checkForUpdates: () => Promise<void>;

declare const RefreshExpiryDialog: (props: RefreshExpiryDialogProps) => react_jsx_runtime.JSX.Element | null;

export { type AuthAction, AuthActionType, AuthContext, type AuthService, type AuthState, type AuthStateWithDispatch, type BaseSSOUser, type BceidIdentityProvider, type CustomRequestInit, type GithubIdentityProvider, type HasRolesOptions, type IdentityProvider, type IdirIdentityProvider, type LoginProps, type OriginalSSOUser, RefreshExpiryDialog, type RefreshExpiryDialogProps, type SSOBCeIDUser, type SSOBcServicesCardUser, type SSOGithubUser, type SSOIdirUser, SSOProvider, type SSOProviderProps, type SSOUser, SSOWrapper, type SSOWrapperProps, checkForUpdates, decodeJWT, hasAllRoles, hasAtLeastOneRole, initialState, normalizeUser, reducer, useSSO };
```
