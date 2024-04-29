# Custom Refresh Expiry Function

!!! note "Note"
    By default, when a refresh token expires, the user will be prompted to re-log or continue their session by the `RefreshExpiryDialog`.  
    This can be swapped out for a custom solution by adding a `onRefreshExpiry` prop to `SSOProvider`.

#### `Example`

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

If you are building your own dialog, you can reference how the default dialog is made from the files below:  
[Provider](https://github.com/bcgov/citz-imb-sso-react/blob/main/src/components/Provider.tsx)  
[RefreshExpiryDialog](https://github.com/bcgov/citz-imb-sso-react/blob/main/src/components/RefreshExpiryDialog)  
