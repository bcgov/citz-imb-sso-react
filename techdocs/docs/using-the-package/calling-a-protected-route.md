# Calling a Protected Route

In order to call an endpoint that has been protected by `protectedRoute` middleware, you must add the `Authorization` header to your request.

There is two ways to do this. The first is by using the `fetchProtectedRoute` function which is a wrapper for the Node Fetch API `fetch` function. This works in the exact same way as `fetch` but the `Authorization` header will be added behind the scenes.

#### `Example`

```JavaScript
// Must be within a React functional component or hook and async.
const { fetchProtectedRoute } = useSSO();

// Define the request function.
const callTest = async () => {
  const response = await fetchProtectedRoute("/api/test", { 
    method: "GET" 
  });
  return await response.json();
};

// Make the request.
const testData = await callTest();
```

The alternative is to get the `Authorization` header value and set it yourself.

#### `Example`

```JavaScript
// Must be within a React functional component or hook and async.
const { getAuthorizationHeaderValue } = useSSO();

// Define the request function.
const callTest = async () => {
    const response = await fetch("/api/test", {
      method: "GET",
      headers: {
        Authorization: getAuthorizationHeaderValue(),
      },
    });
    return await response.json();
  };

// Make the request.
const testData = await callTest();
```
