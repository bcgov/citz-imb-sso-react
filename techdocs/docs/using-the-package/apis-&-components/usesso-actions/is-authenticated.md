# isAuthenticated Action 

The `isAuthenticated` action of the `useSSO` hook is a boolean state that says if the user is logged in and authenticated.

## Usage

A basic example of using the `isAuthenticated` state to display a greeting if the user is authenticated.

```JavaScript
import { useSSO } from "@bcgov/citz-imb-sso-react";

export const Greeting = () => {
  const {
    isAuthenticated,
    user
  } = useSSO();

  return (
    <>
      {isAuthenticated
        ? <p>Hi {user?.firstName}!</p>
        : <p>Please log in.</p> 
      }
    </>
  );
}
```
