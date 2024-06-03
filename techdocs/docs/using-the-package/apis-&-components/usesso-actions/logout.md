# logout Action 

The `logout` action of the `useSSO` hook is a function that logs the user out.

## Usage

A basic example of using the `logout` function to provide a logout button.

```JavaScript
import { useSSO } from "@bcgov/citz-imb-sso-react";

export const LogoutButton = () => {
  const {
    logout,
  } = useSSO();

  return (
    <button onClick={() => logout()}>
      LOGOUT
    </button>
  );
}
```

## TypeScript Type

<!-- The following code block is auto generated when types in the package change. -->
<!-- TYPE: AuthService.logout -->
```TypeScript
(backendURL?: string) => void;
```

## Parameters

An API reference for the parameters of the `logout` function.

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
  </tbody>
</table>
