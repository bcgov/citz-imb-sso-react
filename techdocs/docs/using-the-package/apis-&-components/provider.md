# SSOProvider 

The `SSOProvider` is a component that is used to pass down data (or state) through the component tree without having to pass props manually at every level. This allows us to create global state that can be shared across components of your React application.

It is used to store state such as the `access token`, `id token`, and `user information`.

## Import

```JavaScript
// ESModule Syntax (preferred)
import { SSOProvider } from "@bcgov/citz-imb-sso-react";

// CommonJS Syntax
const { SSOProvider } = require('@bcgov/citz-imb-sso-react');
```

## Usage

A basic example where your application is using a proxy pass with `/api` (recommended), `idir` as the only Identity Provider, and redirects back to the `FRONTEND_URL` after login.

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

## Props

An API reference for the props of the `SSOProvider` component.

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
      <td>* children</td>
      <td>ReactNode</td>
      <td>-</td>
      <td>The content of your application.</td>
    </tr>
    <tr>
      <td>backendURL</td>
      <td>string</td>
      <td>-</td>
      <td>URL to the backend when not using a proxy pass, or different from `/api`. (Used by default refresh expiry modal).</td>
    </tr>
    <tr>
      <td>idpHint</td>
      <td>IdentityProvider</td>
      <td>-</td>
      <td>Improves login process by directing to a specific provider instead of having the user choose (Used by default refresh expiry modal).</td>
    </tr>
    <tr>
      <td>onRefreshExpiry</td>
      <td>Function</td>
      <td>An internal function that opens a modal asking the user to re-log.</td>
      <td>Custom function to run when refresh token expires. Replaces the default behaviour.</td>
    </tr>
    <tr>
      <td>postLoginRedirectURL</td>
      <td>string</td>
      <td>-</td>
      <td>URL to redirect to after login (Used by default refresh expiry modal).</td>
    </tr>
    <tr>
      <td>overrideShowRefreshExpiryDialog</td>
      <td>boolean</td>
      <td>-</td>
      <td>Used for testing the refresh expiry dialog by forcing it to show (For testing only).</td>
    </tr>
    <tr>
      <td>refreshExpiresInOffset</td>
      <td>number</td>
      <td>-</td>
      <td>Offset for when onRefreshExpiry is called in seconds (For testing only).</td>
    </tr>
  </tbody>
</table>
