# user Action 

The `user` action of the `useSSO` hook is a state of type `SSOUser` that holds user information from SSO.

The `user` object is the result of normalizing the data coming from users of different identity providers such as IDIR and BCeID which have different properties.

## Usage

A basic example of using the `user` state.

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

## TypeScript Type

The type `SSOUser`:

<!-- The following code block is auto generated when types in the package change. -->
<!-- TYPE: SSOUser -->
```TypeScript
type SSOUser = BaseSSOUser & {
    guid: string;
    username: string;
    first_name: string;
    last_name: string;
    originalData: OriginalSSOUser;
}
```

The type `BaseSSOUser`:

<!-- The following code block is auto generated when types in the package change. -->
<!-- TYPE: BaseSSOUser -->
```TypeScript
type BaseSSOUser = {
    name?: string;
    preferred_username: string;
    email: string;
    display_name: string;
    client_roles?: string[];
    scope?: string;
    identity_provider: IdirIdentityProvider | BceidIdentityProvider | GithubIdentityProvider;
}
```

## Properties

An API reference for the properties of the `user` state.

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
      <td>guid</td>
      <td>string</td>
      <td>Unique user identifier string.</td>
    </tr>
    <tr>
      <td>preferred_username</td>
      <td>string</td>
      <td>A combination of `guid` and `identity_provider`. This is the preferred way to reference a user as it is the most unique attribute.</td>
    </tr>
    <tr>
      <td>username</td>
      <td>string</td>
      <td>A public facing user identifier.</td>
    </tr>
    <tr>
      <td>first_name</td>
      <td>string</td>
      <td>User's given name.</td>
    </tr>
    <tr>
      <td>last_name</td>
      <td>string</td>
      <td>User's family name.</td>
    </tr>
    <tr>
      <td>display_name</td>
      <td>string</td>
      <td>User's full name and usually ministry. A good choice as a public facing user identifier.</td>
    </tr>
    <tr>
      <td>email</td>
      <td>string</td>
      <td>User's email address.</td>
    </tr>
    <tr>
      <td>identity_provider</td>
      <td>IdentityProvider</td>
      <td>User's login identity provider such as IDIR.</td>
    </tr>
    <tr>
      <td>client_roles</td>
      <td>string[]</td>
      <td>User's roles set in SSO dashboard. Preferred you use the hasRoles function instead of checking this property.</td>
    </tr>
    <tr>
      <td>scope</td>
      <td>string</td>
      <td>Describes permissions or access levels the user has within SSO.</td>
    </tr>
    <tr>
      <td>name</td>
      <td>string</td>
      <td>Usually the same as `display_name`.</td>
    </tr>
    <tr>
      <td>originalData</td>
      <td>OriginalSSOUser</td>
      <td>The user data before it was normalized.</td>
    </tr>
  </tbody>
</table>
