# BCGov SSO Integration for React

[![Lifecycle:Experimental](https://img.shields.io/badge/Lifecycle-Experimental-339999)](Redirect-URL)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
[![NodeJS](https://img.shields.io/badge/Node.js_20-43853D?style=for-the-badge&logo=node.js&logoColor=white)](NodeJS)
[![Typescript](https://img.shields.io/badge/TypeScript_5-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](Typescript)
[![React](https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=white&style=for-the-badge)](React)

<br />

<details>
<summary><h2>TL/DR</h2></summary>

1. Install package by following the steps at [Installing the Package](#installing-the-package).
2. Set up the package by following the steps at [Basic Setup Guide](#basic-setup-guide).
3. For use with [@bcgov/citz-imb-sso-express].
4. **BY DEFUALT**, set to work with a proxy pass to the backend using `/api`.
5. To use without a proxy pass, add optional parameter and property of login(), logout(), and SSOProvider for `backendURL`.

</details>

---

## Table of Contents

- [General Information](#general-information)
- [Installing the Package](#installing-the-package) - **Start Here!**
- [Basic Setup Guide](#basic-setup-guide) - Setting up after installing.
   - [Provider](#provider) - Provides SSO functionality to app.
   - [Login & Logout](#login--logout) - Allow users to login and logout.
   - [User State & Protected API Calls](#user-state--protected-api-calls) - Get user data and make requests to protected routes.
   - [Proxy Pass](#proxy-pass) - Set up proxy pass to make requests to backend more robust and simple.
   - [Not Using A Proxy Pass](#not-using-a-proxy-pass) - Set up without a proxy pass, just using backend url.
- [Additional Setup Guide](#additional-setup-guide) - More advanced options for package configuration.
   - [Custom Refresh Expiry Function](#custom-refresh-expiry-function) - Function called when refresh token expires.
- [Directory Structure](#directory-structure) - How the repo is designed.
- [Scripts](#scripts) - Scripts for running and working on the package.
- [Module Exports](#module-exports) - Functions and Types available from the module.
- [TypeScript Types](#typescript-types) - Available TypeScript types.
- [Authentication Flow](#authentication-flow) - How it works.

## General Information

- For running on a NodeJS:20 React 18 app.
- For [CSS] SSO Gold Standard with usecase set as `Browser Login & Service Account`.
- Works with Vanilla JavaScript or Typescript 5.
- For use with [@bcgov/citz-imb-sso-express]
- **BY DEFUALT**, set to work with a proxy pass to the backend using `/api`.
- To use without a proxy pass, add optional parameter and property of login(), logout(), and SSOProvider for `backendURL`.

---

<br />

## Installing the Package

Run `npm install @bcgov/citz-imb-sso-react` or select a specific version tag from [NPM Package].

[Return to Top](#bcgov-sso-integration-for-react)

<br />

## Basic Setup Guide

### Provider

1. Add import for `SSOProvider` and surround your application code with it.

*Example:*

```JavaScript
import { SSOProvider } from "@bcgov/citz-imb-sso-react";
import App from "./App";
import React from "react";
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <SSOProvider idpHint="idir">
        <App />
    </SSOProvider>
  </React.StrictMode>
);
```

> [!NOTE]
> SSOProvider has optional props 'backendURL', 'idpHint', and 'onRefreshExpiry'.

### Login & Logout

2. Adding Login and Logout:

Add import `import { useSSO } from "@bcgov/citz-imb-sso-react";` then add the following to the top of your functional component:

```JavaScript
const {
    isAuthenticated,
    login,
    logout,
  } = useSSO();
```

Conditionally render a Login or Logout button:

```JavaScript
{isAuthenticated ? (
  <button onClick={() => logout()}>
    LOGOUT
  </button>
) : (
  <button onClick={() => login({ idpHint: "idir" })}>
    LOGIN WITH IDIR
  </button>
)}
```

<br />

### User State & Protected API Calls

3. Accessing user state and making protected API calls:

To access auth state and functions add import `import { useSSO } from "@bcgov/citz-imb-sso-react";` then add the following to the top of your functional component:

```JavaScript
const {
    user,
    hasRole,
    getAuthorizationHeaderValue,
    isAuthenticated,
  } = useSSO();

// Is user logged in:
if (isAuthenticated) console.log(`Hi ${user?.display_name}`);
```

Check if the user has a role like:

```JavaScript
// User must have 'Admin' role.
if (hasRole(['Admin'])) // Do something...

// Users must have BOTH 'Member' and 'Commenter' roles.
// requireAllRoles option is true by default.
if (hasRole(['Member', 'Commenter'])) // Do something...

// Users must have EITHER 'Member' or 'Verified' role.
if (hasRole(['Member', 'Verified'], { requireAllRoles: false })) // Do Something...
```

Complete an authenticated request like in the example below:

Both functions come from `useSSO()`.

```JavaScript
// NEW way:
// Using fetchProtectedRoute, which is a wrapper for Node Fetch API.
const callTest = async () => {
  const response = await fetchProtectedRoute("/api/test", { 
    method: "GET" 
  });
  return await response.json();
};

// OLD way:
// Using getAuthorizationHeaderValue function.
const callTest = async () => {
    const response = await fetch("/api/test", {
      method: "GET",
      headers: {
        Authorization: getAuthorizationHeaderValue(),
      },
    });
    return await response.json();
  };
```
User state can be accessed through `user` from the `useSSO()` hook. The `user` object is a normalized object that combines properties of users from different identity providers into a single user object.

Example `user` object from `useSSO()` hook (Typescript Type is `SSOUser`):

```JSON
{
  "guid": "W7802F34D2390EFA9E7JK15923770279",
  "preferred_username": "a7254c34i2755fea9e7ed15918356158@idir",
  "username": "JOHNDOE",
  "email": "john.doe@gov.bc.ca",
  "name": "Doe, John CITZ:EX",
  "display_name": "Doe, John CITZ:EX",
  "first_name": "John",
  "last_name": "Doe",
  "client_roles": ["Admin"],
  "scope": "openid idir email profile azureidir",
  "identity_provider": "idir",
  "originalData": { /* ... (original user data from sso) */ }
}
```

For all user properties of `user.originalData` which is of type `OriginalSSOUser`, reference [SSO Keycloak Wiki - Identity Provider Attribute Mapping].  

> [!Note*] 
> _When checking if a user has a role, it is advised to use the `hasRole()` function from `useSSO()`._

<br />

### Proxy Pass

4. Setting up proxy pass:

For use with vite, the following setup as a property of `server` inside your vite config will work:

```JavaScript
proxy: {
  "/api": {
    target: "http://<backend-service-name>:<backend-port>/",
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, ""),
  },
},
```

Be sure to replace `<backend-service-name>` and `<backend-port>`. For docker containers, this is the service name from the compose file.

For use in Nginx configs, the following setup as a property of `server` will work:

```
location /api/ {
  proxy_pass http://<backend-service-name>:<backend-port>/;
  proxy_set_header Host $host;
}
```

Again, be sure to replace `<backend-service-name>` and `<backend-port>`.

<br />

### Not Using A Proxy Pass

5. If you are not using a proxy pass, you will need to set `backendUrl` and `idpHint` props on `SSOProvider` component and `login` function.

Even if you are using a proxy, `idpHint` is always recommended.

```JavaScript
// Example usage:
<SSOProvider backendURL="http://localhost:3000" idpHint="idir">
</SSOProvider>

// Example usage: 
login({ backendURL: "http://localhost:3000", idpHint: "idir" });
```

[Return to Top](#bcgov-sso-integration-for-react)

<br />

## Additional Setup Guide

### Custom Refresh Expiry Function

1. Setting a custom function for when the refresh token expires:

**BY DEFUALT**, when a refresh token expires, the user will be prompted to re-login by the RefreshExpiryDialog. This can be swapped out for a custom solution by adding a `onRefreshExpiry` prop to `SSOProvider`.

*Example:*

```JavaScript
import { SSOProvider } from "@bcgov/citz-imb-sso-react";
import App from "./App";
import React from "react";
import { createRoot } from "react-dom/client";

const customTokenExpiry = () => {
  // Do something such as prompt user to login again.
};

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <SSOProvider onRefreshExpiry={() => customTokenExpiry()}>
        <App />
    </SSOProvider>
  </React.StrictMode>
);
```

Here's how the built in `RefreshExpiryDialog` works:

Within `SSOProvider` is the following functionality:

```JavaScript
// State to track if the dialog should be visible.
const [isExpiryDialogVisible, setIsExpiryDialogVisible] = useState(false);

// Set State to be called onRefreshExpiry to make the dialog visible.
setIsExpiryDialogVisible(true)

// The dialog component.
<RefreshExpiryDialog
  loginProps={{ backendURL, idpHint }}
  isVisible={isExpiryDialogVisible}
/>
```

Here is the `RefreshExpiryDialog` component:

```JavaScript
const RefreshExpiryDialog = (props: RefreshExpiryDialogProps) => {
  const { isVisible, loginProps } = props;
  const { login } = useSSO();

  if (!isVisible) return null;

  return (
    <>
      <div className="ssor_dialog-overlay" />
      <dialog className="ssor_dialog" open={isVisible}>
        <div className="ssor_dialog-content">
          <p className="ssor_dialog-message">Your login session has expired.</p>
          <button className="ssor_button" onClick={() => login(loginProps)}>
            RE-LOGIN
          </button>
        </div>
      </dialog>
    </>
  );
};
```

Here is the `RefreshExpiryDialog` css classes:

```CSS
.ssor_dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Translucent grey */
  z-index: 999; /* Ensure it's below the dialog and above other elements */
}

.ssor_dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #484848;
  border-radius: 5px;
  padding: 40px;
  background-color: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.ssor_dialog-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.ssor_dialog-message {
  font-size: 1.25em;
  font-weight: 700;
  color: #656565;
  font-family: 'Trebuchet MS', Arial, sans-serif;
  text-align: center;
  margin-bottom: 20px;
}

.ssor_button {
  background-color: #234075;
  color: white;
  border: none;
  padding: 10px 20px;
  border: 1px solid #484848;
  border-radius: 5px;
  font-size: 1em;
  font-family: 'Trebuchet MS', Arial, sans-serif;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.ssor_button:hover {
  background-color: #1b325c;
}
```

[Return to Top](#bcgov-sso-integration-for-react)

<br />

## Directory Structure

```
.
├── .github/
|   ├── config/
|   |   └── dep-report.json5                # Configure options for NPM Dep Report.
|   ├── helpers/
|   |   ├── github-api/                     # Functions to access the GitHub API.
|   |   ├── create-npm-dep-report-issues.js # Creates GitHub Issues for Npm Dep Reports.
|   |   ├── create-npm-dep-report.js        # Creates text bodies for Npm Dep Reports.
|   |   ├── parse-json5-config.js           # Parses json5 files for GitHub actions output.
|   |   └── parse-npm-deps.js               # Parses package.json files for changes to package versions.
|   ├── workflows/
|   |   ├── npm-dep-report.yaml             # Reports on new package versions.
|   |   └── releases.yaml                   # Creates a new GitHub Release.
├── scripts/
|   ├── bump-version.mjs                    # Bumps version in package.json file.
|   ├── post-commit-version-change.mjs      # Bumps version when post-commit is run.
|   ├── remove-css-imports.js               # Removes css imports from TypeScript declaration files from the build.
|   ├── remove-dts-files.js                 # Removes TypeScript declaration files from the build.
|   └── remove-empty-dirs.js                # Removes empty directories from the build.
├── src/                                    # Source code for package.
|   ├── components/
|   |   ├── Provider.tsx                    # Provides auth state to an application.
|   |   ├── RefreshExpiryDialog.tsx         # Default dialog to come up when token expires.
|   |   └── Wrapper.tsx                     # Provides auth services such as refresh token tracking.
|   ├── state/
|   |   ├── reducer.ts                      # Manages auth state from context.
|   |   └── useSSO.ts                       # Functions using auth state.
|   ├── context.ts                          # React Context for storing auth data.
|   ├── index.ts                            # Export functions for the package.
|   ├── types.ts                            # TypeScript types.
|   └── utils.ts                            # Utility functions.
├── package.json                            # Package config and dependencies.
├── .npmrc                                  # NPM config.
├── rollup.config.js                        # Builds and compiles TypeScript files into JavaScript.
├── rollupdts.config.js                     # Builds and compiles TypeScript declartion files.
```

[Return to Top](#bcgov-sso-integration-for-react)

<br />

## Scripts

```bash
# Compile all src code into a bundle in build/ directory.
$ npm run build
```

```bash
# Part of 'build' and it bundles the typescipt declarations into a single bundle.d.ts file.
$ npm run build:dts
```

```bash
# Part of build and it removes directories and files before the build.
$ npm run clean:prebuild
```

```bash
# Part of build and it removes directories and files after the build.
$ npm run clean:postbuild
```

```bash
# Used to package the code before a release.
$ npm run pack
```

[Return to Top](#bcgov-sso-integration-for-react)

<br />

## Module Exports

These are the functions and types exported by the `@bcgov/citz-imb-sso-react` module.

```JavaScript
import {
  SSOProvider, // Manages the sso service in your react app.
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
  HasRoleOptions, // Optional options parameter for hasRole function of useSSO().
  AuthService, // Type for useSSO().
  AuthState, // Type for state of useSSO().
  SSOUser, // Normalized user info for all identity providers.
  OriginalSSOUser, // All user info from SSO.
  SSOIdirUser, // User types specific to Idir users.
  SSOBCeIDUser, // User types specific to BCeID users.
  SSOGithubUser, // User types specific to Github users.
} from '@bcgov/citz-imb-sso-react';
```

[Return to Top](#bcgov-sso-integration-for-react)

<br />

## TypeScript Types

These are the TypeScript types of the `@bcgov/citz-imb-sso-react` module.

```TypeScript
const reducer = (state: AuthState, action: AuthAction): AuthState;
const useSSO = (): AuthService;
const SSOProvider = (props: SSOProviderProps): React.JSX.Element;

// Defines the possible types of authentication actions.
export enum AuthActionType {
  LOGOUT = 'LOGOUT',
  ATTEMPT_LOGIN = 'ATTEMPT_LOGIN',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
  UNAUTHORIZED = 'UNAUTHORIZED',
}

// Initial authentication state.
export const initialState: AuthState = {
  isLoggingIn: false,
  isAuthenticated: false,
  accessToken: undefined,
  idToken: undefined,
  userInfo: undefined,
};

// PROPS
export type SSOProviderProps = {
  backendURL?: string;
  idpHint?: IdentityProvider;
  children: ReactNode;
  onRefreshExpiry?: Function;
};
export type SSOWrapperProps = {
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
  isAuthenticated: boolean;
  isLoggingIn: boolean;
  user?: SSOUser;
  getAuthorizationHeaderValue: () => string;
  fetchProtectedRoute: (url: string, options?: any) => Promise<Response>;
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
    userInfo?: OriginalSSOUser;
  };
};

export type AuthState = {
  isLoggedIn: boolean;
  isAuthenticated: boolean;
  accessToken?: string;
  idToken?: string;
  userInfo?: OriginalSSOUser;
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
  identity_provider:
    | IdirIdentityProvider
    | BceidIdentityProvider
    | GithubIdentityProvider;
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

export type OriginalSSOUser = BaseSSOUser &
  SSOIdirUser &
  SSOBCeIDUser &
  SSOGithubUser;

export type SSOUser = BaseSSOUser & {
  guid: string;
  username: string;
  first_name: string;
  last_name: string;
  originalData: OriginalSSOUser;
};
```

[Return to Top](#bcgov-sso-integration-for-react)

<br />

## Authentication Flow

<img src="./assets/flow.PNG" alt="Flow chart">

[Return to Top](#bcgov-sso-integration-for-react)

<!-- Link References -->

[@bcgov/citz-imb-sso-express]: https://github.com/bcgov/citz-imb-sso-express
[NPM Package]: https://www.npmjs.com/package/@bcgov/citz-imb-sso-react
[releases]: https://github.com/bcgov/citz-imb-sso-react/releases
[CSS]: https://bcgov.github.io/sso-requests
[SSO Keycloak Wiki - Identity Provider Attribute Mapping]: https://github.com/bcgov/sso-keycloak/wiki/Identity-Provider-Attribute-Mapping
