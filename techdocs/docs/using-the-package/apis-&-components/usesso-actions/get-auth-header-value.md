# getAuthorizationHeaderValue Action 

The `getAuthorizationHeaderValue` action of the `useSSO` hook returns the value for the `Authorization` header so that requests can be made to protected routes on the backend.

!!! note "Note"
    It is advised to use the [fetchProtectedRoute] function instead.

## Usage

A basic example of using the `getAuthorizationHeaderValue` function to fetch data from the protected `/api/test` route upon component mount.

```JavaScript
import { useState, useEffect } from 'react';
import { useSSO } from "@bcgov/citz-imb-sso-react";

export const TestData = () => {
  const { getAuthorizationHeaderValue } = useSSO();
  const [testData, setTestData] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Define the request function.
  const callTest = async () => {
    const response = await fetch("/api/test", { 
      method: "GET",
      headers: { Authorization: getAuthorizationHeaderValue() }
    });
    return await response.json();
  };

  // Use useEffect to make the request on component mount.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await callTest();
        setTestData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setTestData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Render the component.
  return (
    <div>
      {loading ? <p>Loading...</p> : <p>{testData}</p>}
    </div>
  );
}
```

<!-- Link References -->
[fetchProtectedRoute]: ../fetch-protected-route
