# login Action 

The `login` action of the `useSSO` hook is a function that initiates the login process.

## Usage

A basic example of using the `login` function to provide a login button for IDIR users that redirects back to the `/post-login` route.

```JavaScript
import { useSSO } from "@bcgov/citz-imb-sso-react";

export const LoginButton = () => {
  const {
    login,
  } = useSSO();

  return (
    <button onClick={() => login({ idpHint: "idir", postLoginRedirectURL: "/post-login" })}>
      LOGIN WITH IDIR
    </button>
  );
}
```

## TypeScript Type

```TypeScript
(options?: LoginProps) => void;
```

## Parameters

An API reference for the parameters of the `login` function.

The Name column starting with `*` means the prop is required.

<table>
  <!-- Table columns -->
  <thead>
    <tr>
      <th style="background: #6f19d9; color: white;">Name</th>
      <th style="background: #6f19d9; color: white;">Type</th>
      <th style="background: #6f19d9; color: white;">Default</th>
      <th style="background: #6f19d9; color: white;">Description</th>
    </tr>
  </thead>

  <!-- Table rows -->
  <tbody>
  <tr>
      <td>backendURL</td>
      <td>string</td>
      <td>/api</td>
      <td>URL to the backend when not using a proxy pass, or a different proxy pass from `/api`.</td>
    </tr>
    <tr>
      <td>idpHint</td>
      <td>IdentityProvider</td>
      <td>-</td>
      <td>Improves login process by directing to a specific provider instead of having the user choose.</td>
    </tr>
    <tr>
      <td>postLoginRedirectURL</td>
      <td>string</td>
      <td>*The `FRONTEND_URL` env variable.*</td>
      <td>URL or path to redirect to after login.</td>
    </tr>
  </tbody>
</table>
