# Major Release 1.0.0

!!! info
    The Major Releases pages are here to describe what the major releases of this package are for, what they offer, their dependencies, and how to upgrade from the previous version.

Release 1.0.0 is the first stable release of the package. It offers an integration solution for connecting React applications requiring authentication to the B.C. government's Single Sign-On ([CSS]) service. It abstracts the complexity of handling SSO protocols manually. By using this package, developers can quickly implement authentication and authorization in their React applications to meet B.C. government security standards.

## Dependencies

- NodeJS 20
- React 18
- [@bcgov/citz-imb-sso-express] 1.x.x

## Features

- Call API endpoints protected behind SSO login.
- Get user information from logged in user.
- Automatic token refresh in the background of your app.
- Default pop up when refresh token expires, or option for custom solution.
- Type safety.

<!-- Link References -->
[CSS]: https://bcgov.github.io/sso-requests
[@bcgov/citz-imb-sso-express]: https://github.com/bcgov/citz-imb-sso-express
