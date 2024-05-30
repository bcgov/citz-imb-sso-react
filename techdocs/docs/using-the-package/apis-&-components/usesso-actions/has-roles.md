# hasRoles Action 

The `hasRoles` action of the `useSSO` hook is a function used to check if the logged in user has specific role(s).

## Usage

A basic example of using the `hasRoles` function to display a different message based on the user's roles.

```JavaScript
import { useSSO } from "@bcgov/citz-imb-sso-react";

export const RoleMessage = () => {
  const { hasRoles } = useSSO();

  // User must have 'Admin' role.
  if (hasRoles(['Admin'])) 
    return <p>Admin's have access to moderation features.</p>;

  // Users must have BOTH 'Member' and 'VIP' roles.
  // requireAllRoles option is true by default.
  if (hasRoles(['Member', 'VIP'])) 
    return <p>VIP's have access to more features.</p>;

  // Users must have EITHER 'Member' or 'Verified' role.
  if (hasRoles(['Member', 'Verified'], { requireAllRoles: false })) 
    return <p>Verified users have access to the application.</p>;

  return <p>Verify your account to get access to the application.</p>;
}
```

!!! note "Note"
    By default, all roles in the array will be required.  
    If you wish to require only one of a list of roles, add the options parameter with `requireAllRoles` property set to `false`.

## Parameters

An API reference for the parameters of the `hasRoles` function.

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
      <td>* roles</td>
      <td>string[]</td>
      <td>-</td>
      <td>The role names to check if the user has.</td>
    </tr>
    <tr>
      <td>options</td>
      <td>HasRolesOptions</td>
      <td>{ requireAllRoles: true }</td>
      <td>Configurable options for the `hasRoles` function.</td>
    </tr>
    <tr>
      <td>options.requireAllRoles</td>
      <td>boolean</td>
      <td>true</td>
      <td>If all roles in the `roles` array should be required or if only a single role is required.</td>
    </tr>
  </tbody>
</table>
