# Quick Start Guide

Set up in 3 steps.

### 1. Add SSO Provider

Add import for `SSOProvider` and surround your react application code with it.

#### `Example:`

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

!!! note "Note"
    SSOProvider has optional props `backendURL`, `idpHint`, `onRefreshExpiry`, and `postLoginRedirectURL`.  
    See [TypeScript Type](../using-the-package/typescript-types.md) SSOProviderProps for more details on usage.

---

<br />

### 2. Add Login and Logout

Add import for `useSSO` then add the following to the top of your React functional component:

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
  <button onClick={() => login({ idpHint: "idir", postLoginRedirectURL: "/post-login" })}>
    LOGIN WITH IDIR
  </button>
)}
```

!!! note "Note"
    login() has optional props `backendURL`, `idpHint`, and `postLoginRedirectURL`.  
    See [TypeScript Type](../using-the-package/typescript-types.md) LoginProps for more details on usage.

---

<br />

### 3. Proxy pass

!!! warning "Important"
    This package is set up to use a proxy pass to the backend by default using `/api`.  
    This means that all traffic to `<frontend url>/api` will be directed to `<backend_url>`.  
    If your application is not using a proxy pass, or is using a different proxy follow the steps below.

To set up a proxy using `vite` and `nginx` see [Setting Up a Proxy Pass](./proxy-pass/setting-up-a-proxy-pass.md).

To set up the package to work without a proxy pass or to work with a proxy pass different from `/api` see [Not Using a Proxy Pass](../getting-started/proxy-pass/not-using-a-proxy-pass.md).

