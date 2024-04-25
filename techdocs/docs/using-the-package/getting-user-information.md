# Getting User Information

## Checking if the user has a role

You can check if the user has a role or roles with the `hasRoles` function which can be accessed from the `useSSO` hook.

```JavaScript
// Must be within a React functional component or hook.
const { hasRoles } = useSSO();

// User must have 'Admin' role.
if (hasRoles(['Admin'])) // Do something...

// Users must have BOTH 'Member' and 'Commenter' roles.
// requireAllRoles option is true by default.
if (hasRoles(['Member', 'Commenter'])) // Do something...

// Users must have EITHER 'Member' or 'Verified' role.
if (hasRoles(['Member', 'Verified'], { requireAllRoles: false })) // Do Something...
```

!!! note "Note"
    By default, all roles in the array will be required.  
    If you wish to require only one of a list of roles, add the options parameter with `requireAllRoles` property set to `false`.

---

<br />

## Getting user data such as name and email

Access user information from the `user` object (of type `SSOUser`) which can be accessed from the `useSSO` hook.

```JavaScript
// Must be within a React functional component or hook.
const { user } = useSSO();
```

### `Example user object:`

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

!!! note "Note"
    This user data has been normalized from the `user.originalData` data provided by SSO.  
    For all properties of `user.originalData` which is of type `OriginalSSOUser`, reference [SSO Keycloak Wiki - Identity Provider Attribute Mapping].  

<!-- Link References -->
[SSO Keycloak Wiki - Identity Provider Attribute Mapping]: https://github.com/bcgov/sso-keycloak/wiki/Identity-Provider-Attribute-Mapping

