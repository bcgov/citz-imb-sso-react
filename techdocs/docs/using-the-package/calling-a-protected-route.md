# Calling a Protected Route

In order to call an endpoint that has been protected by `protectedRoute` middleware, you must add the `Authorization` header to your request.

There is two ways to do this. The first is by using the [fetchProtectedRoute] function which is a wrapper for the Node Fetch API `fetch` function. This works in the exact same way as `fetch` but the `Authorization` header will be added behind the scenes.

#### `Example`

```JavaScript
import { useState, useEffect } from 'react';
import { useSSO } from "@bcgov/citz-imb-sso-react";

export const TestData = () => {
  const { fetchProtectedRoute } = useSSO();
  const [testData, setTestData] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Define the request function.
  const callTest = async () => {
    const response = await fetchProtectedRoute("/api/test", { 
      method: "GET" 
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

The alternative is to get the `Authorization` header value from [getAuthorizationHeaderValue] and set it yourself.

#### `Example`

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
[fetchProtectedRoute]: ../using-the-package/apis-&-components/usesso-actions/fetch-protected-route
[getAuthorizationHeaderValue]: ../using-the-package/apis-&-components/usesso-actions/get-auth-header-value
