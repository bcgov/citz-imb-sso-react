# Module Exports

These are the functions and types exported by the package.

```JavaScript
import {
  SSOProvider, // Manages the sso service state in your react app.
  useSSO, // Hook used for authentication and authorization state and functions.
} from '@bcgov/citz-imb-sso-react';

// TypeScript Types:
import {
  SSOProviderProps, // Props for SSOProvider component.
  LoginProps, // Props for login function of useSSO().
  IdirIdentityProvider, // Used for more efficient login.
  GithubIdentityProvider, // Used for more efficient login.
  BceidIdentityProvider, // Used for more efficient login.
  IdentityProvider, // Combined type for identity providers.
  HasRolesOptions, // Optional options parameter for hasRoles function of useSSO().
  AuthService, // Type for useSSO().
  AuthState, // Type for state of useSSO().
  SSOUser, // Normalized user info for all identity providers.
  CombinedSSOUser, // All user info from SSO.
  SSOIdirUser, // User types specific to Idir users.
  SSOBCeIDUser, // User types specific to BCeID users.
  SSOGithubUser, // User types specific to Github users.
} from '@bcgov/citz-imb-sso-react';
```
