# fetchProtectedRoute Action 

The `fetchProtectedRoute` action of the `useSSO` hook is a wrapper for the native NodeJS fetch function that adds the `Authorization` header so the backend knows who the user making the request is.

For documentation on the underlying fetch function, visit [NodeJS Native Fetch].

## Usage

### Native JavaScript

A basic example of using the `fetchProtectedRoute` function to fetch data from the protected `/api/test` route upon component mount.

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

### React Query

!!! danger "Warning"
    This example has not been tested. It is taken from ChatGPT-4o and is intended to assist in the integration with React Query. If you have tested this and it works, please let a member of our team know!

A basic example of using the `fetchProtectedRoute` function to fetch data from the protected `/api/test` route upon component mount using React Query (a popular library for managing server state in React applications, providing tools for fetching, caching, synchronizing, and updating data efficiently).

```JavaScript
import React from 'react';
import { useQuery } from 'react-query';
import { useSSO } from '@bcgov/citz-imb-sso-react';

const fetchTestData = async (fetchProtectedRoute: any) => {
  const response = await fetchProtectedRoute('/api/test', { method: 'GET' });
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export const Data: React.FC = () => {
  const { fetchProtectedRoute } = useSSO();

  // Use React Query's useQuery hook
  const { data, error, isLoading } = useQuery('testData', () => fetchTestData(fetchProtectedRoute));

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error: {(error as Error).message}</p>;

  return <p>{JSON.stringify(data)}</p>;
};
```

## Parameters

An API reference for the parameters of the `fetchProtectedRoute` function.

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
      <td>* url</td>
      <td>string</td>
      <td>-</td>
      <td>URL to make the request to.</td>
    </tr>
    <tr>
      <td>options</td>
      <td>RequestInit</td>
      <td>{ method: 'GET', headers: { Authorization: '***' }, body: null, ... }</td>
      <td>Options for the request.</td>
    </tr>
  </tbody>
</table>

<!-- Link References -->
[NodeJS Native Fetch]: https://developer.mozilla.org/en-US/docs/Web/API/fetch
