# TypeScript Types

These are the TypeScript types available within the package.

```TypeScript
declare const useSSO: () => AuthService;

type AuthService = { // Type returned by useSSO().
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

type SSOProviderProps = { // Login related props are used by the default Refresh Expiry dialog.
    backendURL?: string; // URL to the backend when not using a proxy pass, or different from /api
    idpHint?: IdentityProvider; // Improves login process.
    children: ReactNode;
    onRefreshExpiry?: Function; // Custom function to run when refresh token expires.
    overrideShowRefreshExpiryDialog?: boolean; // Used for testing the refresh expiry dialog by forcing it to show.
    postLoginRedirectURL?: string; // URL to redirect to after login.
    refreshExpiresInOffset?: number; // Offset for when onRefreshExpiry is called (seconds).
};

type LoginProps = {
    backendURL?: string; // URL to the backend when not using a proxy pass, or different from /api
    idpHint?: IdentityProvider; // Improves login process.
    postLoginRedirectURL?: string; // URL to redirect to after login.
};

type IdirIdentityProvider = 'idir';
type GithubIdentityProvider = 'githubbcgov' | 'githubpublic';
type BceidIdentityProvider = 'bceidbasic' | 'bceidbusiness' | 'bceidboth';
type IdentityProvider = IdirIdentityProvider | BceidIdentityProvider | GithubIdentityProvider;

type HasRolesOptions = {
    requireAllRoles?: boolean; // Set to false to not require user to have all roles in the roles array.
};

type BaseSSOUser = {
    name?: string;
    preferred_username: string; // Use this or guid as a unique identifier when saving users to a database.
    email: string;
    display_name: string;
    client_roles?: string[]; // Preferred you use hasRoles function instead of this.
    scope?: string;
    identity_provider: IdirIdentityProvider | BceidIdentityProvider | GithubIdentityProvider;
};

type SSOUser = BaseSSOUser & {
    guid: string;
    username: string;
    first_name: string;
    last_name: string;
    originalData: OriginalSSOUser; // User data before it was normalized.
};

type OriginalSSOUser = BaseSSOUser & SSOIdirUser & SSOBCeIDUser & SSOGithubUser;

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
