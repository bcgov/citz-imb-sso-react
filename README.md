# BCGov SSO Keycloak Integration for React

[![Lifecycle:Experimental](https://img.shields.io/badge/Lifecycle-Experimental-339999)](Redirect-URL)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

[![NodeJS](https://img.shields.io/badge/Node.js_20-43853D?style=for-the-badge&logo=node.js&logoColor=white)](NodeJS)
[![Typescript](https://img.shields.io/badge/TypeScript_5-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](Typescript)
[![React](https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=white&style=for-the-badge)](React)

<br />

<details>
<summary><h2>TL/DR</h2></summary>

1. Install package by following the steps at [Installing the Package](#installing-the-package).
2. Set up the package by following the steps at [Basic Setup Guide](#basic-setup-guide).
3. For use with [@bcgov/citz-imb-kc-express].
4. **BY DEFUALT**, set to work with a proxy pass to the backend using `/api`.
5. To use without a proxy pass, add optional parameter and property of login(), logout(), and KeycloakProvider for `backendURL`.

</details>

---

## Table of Contents

- [General Information](#general-information)

- [Installing the Package](#installing-the-package) - **Start Here!**
- [Basic Setup Guide](#basic-setup-guide) - Setting up after installing.

- [Module Exports](#module-exports) - Functions and Types available from the module.
- [TypeScript Types](#typescript-types) - Available TypeScript types.

- [Authentication Flow](#authentication-flow) - How it works.
- [Applications using Keycloak Solution](#applications-using-keycloak-solution) - See an example of how to use.

## General Information

- For running on a NodeJS:20 React 18 app.
- For Keycloak Gold Standard.
- Works with Vanilla JavaScript or Typescript 5.
- For use with [@bcgov/citz-imb-kc-express]
- **BY DEFUALT**, set to work with a proxy pass to the backend using `/api`.
- To use without a proxy pass, add optional parameter and property of login(), logout(), and KeycloakProvider for `backendURL`.

---

<br />

## Installing the Package

1. Add the following line to your `package.json`:

``` JSON5
{
  "dependencies": {
    "@bcgov/kc-react": "https://github.com/bcgov/citz-imb-kc-react/releases/download/v<VERSION>/bcgov-citz-imb-kc-react-<VERSION>.tgz",
    // The rest of your dependencies...
  },
}
```

2. Replace `<VERSION>` with the version you wish to use. Reference [releases] for version numbers.

<br />

3. Run `npm install` to add the package.

[Return to Top](#bcgov-sso-keycloak-integration-for-react)

<br />

## Basic Setup Guide

1. Add import `import { KeycloakProvider } from "@bcgov/citz-imb-kc-react";` and surround your application code with `KeycloakProvider`.

*Example:*

```JavaScript
import { KeycloakProvider } from "@bcgov/citz-imb-kc-react";
import App from "./App";
import React from "react";
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <KeycloakProvider>
        <App />
    </KeycloakProvider>
  </React.StrictMode>
);
```

2. Adding Login and Logout:

Add import `import { useKeycloak } from "@bcgov/citz-imb-kc-react";` then add the following to the top of your functional component:

```JavaScript
const {
    state,
    login,
    logout,
  } = useKeycloak();
const user = state?.userInfo;
```

Conditionally render a Login or Logout button:

```JavaScript
{user ? (
  <button onClick={() => login({ idpHint: "idir" })}>
    LOGIN WITH IDIR
  </button>
) : (
  <button onClick={() => logout()}>
    LOGOUT
  </button>
)}
```

<br />

3. Accessing user state:

To access auth state and functions add import `import { useKeycloak } from "@bcgov/citz-imb-kc-react";` then add the following to the top of your functional component:

```JavaScript
const {
    state,
    hasRole,
    getAuthorizationHeaderValue,
  } = useKeycloak();
const user = state?.userInfo;
```

Check if the user has a role like:

```JavaScript
if (hasRole('Admin')) // Do something...
```

Complete an authenticated request like in the example below:

```JavaScript
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

For all user properties reference [SSO Keycloak Wiki - Identity Provider Attribute Mapping].  
Example IDIR `state.userInfo` object (Typescript Type is `KeycloakUser & KeycloakIdirUser` from `citz-imb-kc-express` package):

```JSON
{
  "idir_user_guid": "W7802F34D2390EFA9E7JK15923770279",
  "identity_provider": "idir",
  "idir_username": "JOHNDOE",
  "name": "Doe, John CITZ:EX",
  "preferred_username": "a7254c34i2755fea9e7ed15918356158@idir",
  "given_name": "John",
  "display_name": "Doe, John CITZ:EX",
  "family_name": "Doe",
  "email": "john.doe@gov.bc.ca",
  "client_roles": ["Admin"]
}
```

> **Note**: _'client_roles' is the only property in this list that can be undefined. All other properties if empty will be an empty string. When checking if a user has a role, it is advised to use the hasRole() function._

<br />

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

[Return to Top](#bcgov-sso-keycloak-integration-for-react)

<br />

## Module Exports

These are the functions and types exported by the `@bcgov/citz-imb-kc-react` module.

```JavaScript
import {
  KeycloakProvider, // Manages the keycloak service in your react app.
  useKeycloak, // Hook used for authentication and authorization state and functions.
} from '@bcgov/citz-imb-kc-react';

```

[Return to Top](#bcgov-sso-keycloak-integration-for-react)

<br />

## TypeScript Types

These are the TypeScript types of the `@bcgov/citz-imb-kc-react` module.

```TypeScript
const reducer = (state: AuthState, action: AuthAction): AuthState;
const useKeycloak = (): AuthService;
const KeycloakProvider = (props: KeycloakProviderProps): React.JSX.Element;

// Defines the possible types of authentication actions.
export enum AuthActionType {
  LOGOUT = "LOGOUT",
  REFRESH_TOKEN = "REFRESH_TOKEN",
}

// Initial authentication state.
export const initialState: AuthState = {
  accessToken: undefined,
  idToken: undefined,
  userInfo: undefined,
};

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

export interface AuthService {
  state: AuthState;
  getAuthorizationHeaderValue: () => string;
  hasRole: (role: string) => boolean;
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
```

[Return to Top](#bcgov-sso-keycloak-integration-for-react)

<br />

## Authentication Flow

<img src="./assets/flow.png" alt="Flow chart">

[Return to Top](#bcgov-sso-keycloak-integration-for-react)

<br />

## Applications using Keycloak Solution

The following applications are currently using this keycloak implementation solution:

[SET](https://github.com/bcgov/citz-imb-salary-estimate-tool) - Salary Estimation Tool

[Return to Top](#bcgov-sso-keycloak-integration-for-react)

<!-- Link References -->

[@bcgov/citz-imb-kc-express]: https://github.com/bcgov/citz-imb-kc-express
[releases]: https://github.com/bcgov/kc-react/releases
[SSO Keycloak Wiki - Identity Provider Attribute Mapping]: https://github.com/bcgov/sso-keycloak/wiki/Identity-Provider-Attribute-Mapping
