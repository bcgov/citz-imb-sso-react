# useSSO

The `useSSO` hook is a custom React hook that offers authentication and authorization state and functions.

As it is a React hook, you must only use it within a component or another hook.

## Import

```JavaScript
// ESModule Syntax (preferred)
import { useSSO } from "@bcgov/citz-imb-sso-react";

// CommonJS Syntax
const { useSSO } = require('@bcgov/citz-imb-sso-react');
```

## Usage

### Login & Logout Buttons

A basic example of using the `useSSO` hook to provide login and logout buttons.

```JavaScript
import { useSSO } from "@bcgov/citz-imb-sso-react";

export const AuthButton = () => {
  const {
    isAuthenticated,
    login,
    logout,
  } = useSSO();

  return (
    <>
      {isAuthenticated ? (
        <button onClick={() => logout()}>
          LOGOUT
        </button>
      ) : (
        <button onClick={() => login({ idpHint: "idir", postLoginRedirectURL: "/post-login" })}>
          LOGIN WITH IDIR
        </button>
      )}
    </>
  );
}
```

### Checking User's Roles

A basic example of using the `useSSO` hook to display a different message based on the user's roles.

```JavaScript
import { useSSO } from "@bcgov/citz-imb-sso-react";

export const RoleMessage = () => {
  const { hasRoles } = useSSO();

  // User must have 'Admin' role.
  if (hasRoles(['Admin'])) 
    return <p>Admin's have access to moderation features.</p>;

  // Users must have BOTH 'Member' and 'Commenter' roles.
  // requireAllRoles option is true by default.
  if (hasRoles(['Member', 'VIP'])) 
    return <p>VIP's have access to more features.</p>;

  // Users must have EITHER 'Member' or 'Verified' role.
  if (hasRoles(['Member', 'Verified'], { requireAllRoles: false })) 
    return <p>Verified users have access to the application.</p>;

  return <p>Verify your account to get access to the application.</p>;
}
```

### Getting User Information

A basic example of using the `useSSO` hook to display some of the user's information.

```JavaScript
import { useSSO } from "@bcgov/citz-imb-sso-react";

export const UserInfo = () => {
  const { user } = useSSO();

  return (
    <>
      <p>{user?.display_name ?? 'Unknown'}</p>
      <p>{user?.email}</p>
      {user?.identity_provider === 'idir' && <p>IDIR User</p>}
    </>
  );
}
```

## Hook Actions

An API reference for the actions of the `useSSO` hook.

<table>
  <!-- Table columns -->
  <thead>
    <tr>
      <th style="background: #6f19d9; color: white;">Name</th>
      <th style="background: #6f19d9; color: white;">Type</th>
      <th style="background: #6f19d9; color: white;">Description</th>
    </tr>
  </thead>

  <!-- Table rows -->
  <tbody>
  <tr>
      <td><a href="../usesso-actions/login.md">login</a></td>
      <td>(options?: LoginProps) => void</td>
      <td>A function that starts the login process.</td>
    </tr>
    <tr>
      <td>logout</td>
      <td>(backendURL?: string) => void</td>
      <td>A function that logs the user out.</td>
    </tr>
    <tr>
      <td>isAuthenticated</td>
      <td>boolean</td>
      <td>State saying if the user is logged in and authenticated.</td>
    </tr>
    <tr>
      <td>user</td>
      <td>SSOUser</td>
      <td>State holding user information.</td>
    </tr>
    <tr>
      <td>isLoggingIn</td>
      <td>boolean</td>
      <td>State saying if the user is currently in the login process.</td>
    </tr>
    <tr>
      <td>hasRoles</td>
      <td>(roles: string[], options?: HasRolesOptions) => boolean</td>
      <td>A function to check if the logged in user has specific role(s).</td>
    </tr>
    <tr>
      <td>fetchProtectedRoute</td>
      <td>(url: string, options?: RequestInit) => Promise<Response></td>
      <td>A wrapper for the native NodeJS fetch function that adds the `Authorization` header so the backend knows who the user making the request is.</td>
    </tr>
    <tr>
      <td>getAuthorizationHeaderValue</td>
      <td>() => string</td>
      <td>A function that returns the `Authorization` header value for making requests to the backend so it knows who the user making the request is.</td>
    </tr>
    <tr>
      <td>refreshToken</td>
      <td>(backendURL?: string) => Promise<void></td>
      <td>An internal function that is used to get a new access token from the refresh token, allowing the user to stay logged in.</td>
    </tr>
    <tr>
      <td>state</td>
      <td>AuthState</td>
      <td>Internally used state. Use `user` instead of this to get user information.</td>
    </tr>
  </tbody>
</table>