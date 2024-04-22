# `Quick Start Guide`

### `1. Add SSO Provider` 

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

>  #### Note
>
> SSOProvider has optional props `backendURL`, `idpHint`, `onRefreshExpiry`, and `postLoginRedirectURL`.  
> `backendURL` is only needed if you are not using a proxy pass to the backend with `/api`.  
> `idpHint` is a login prop of type `IdentityProvider`, and it directs the user to a login page specifically for a certain identity provider.  
> `onRefreshExpiry` is a custom function that runs when the user's refresh token expires.  
> `postLoginRedirectURL` is a login prop that redirects the user to a different url after login.  
> The login props above are used by the modal that pops up when your refresh token expires.

---

<br />

### `2. Add Login and Logout` 

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

---

<br />

### `3. Proxy pass`

> #### Important Note
>
> This package is set up to use a proxy pass to the backend by default using `/api`.  
> This means that all traffic to `<frontend url>/api` will be directed to `<backend_url>`.  
> If your application is not using a proxy pass, or is using a different proxy follow the steps below.

To set up a proxy using `vite` and `nginx` see [Setting Up a Proxy Pass](https://github.com/bcgov/citz-imb-sso-react/techdocs/docs/Getting-Started/Proxy-Pass/Setting-Up-a-Proxy-Pass.md).

To set up the package to work without a proxy pass or to work with a proxy pass different from `/api` see [Not Using a Proxy Pass](https://github.com/bcgov/citz-imb-sso-react/techdocs/docs/Getting-Started/Proxy-Pass/Not-Using-a-Proxy-Pass.md).

