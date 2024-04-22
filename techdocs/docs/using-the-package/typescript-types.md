# `TypeScript Types`

These are the TypeScript types available within the package.

```TypeScript
declare const useSSO: () => AuthService;

type AuthService = {
    state: AuthState;
    isAuthenticated: boolean;
    isLoggingIn: boolean;
    user?: SSOUser;
    getAuthorizationHeaderValue: () => string;
    fetchProtectedRoute: (url: string, options?: RequestInit) => Promise<Response>;
    hasRoles: (roles: string[], options?: HasRolesOptions) => boolean;
    refreshToken: (backendURL?: string) => Promise<void>;
    login: (options?: LoginProps) => void;
    logout: (backendURL?: string) => void;
};

type AuthState = {
    isLoggingIn: boolean;
    isAuthenticated: boolean;
    accessToken?: string;
    idToken?: string;
    userInfo?: OriginalSSOUser;
};

type SSOProviderProps = {
    backendURL?: string;
    idpHint?: IdentityProvider;
    children: ReactNode;
    onRefreshExpiry?: Function;
    overrideShowRefreshExpiryDialog?: boolean;
    postLoginRedirectURL?: string;
};

type SSOWrapperProps = {
    backendURL?: string;
    children: ReactNode;
    onRefreshExpiry?: Function;
};

type LoginProps = {
    backendURL?: string;
    idpHint?: IdentityProvider;
    postLoginRedirectURL?: string;
};

type RefreshExpiryDialogProps = {
    isVisible: boolean;
    loginProps?: LoginProps;
};

type IdirIdentityProvider = 'idir';
type GithubIdentityProvider = 'githubbcgov' | 'githubpublic';
type BceidIdentityProvider = 'bceidbasic' | 'bceidbusiness' | 'bceidboth';
type IdentityProvider = IdirIdentityProvider | BceidIdentityProvider | GithubIdentityProvider;

type HasRolesOptions = {
    requireAllRoles?: boolean;
};

type SSOUser = BaseSSOUser & {
    guid: string;
    username: string;
    first_name: string;
    last_name: string;
    originalData: OriginalSSOUser;
};

type OriginalSSOUser = BaseSSOUser & SSOIdirUser & SSOBCeIDUser & SSOGithubUser;

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
```
