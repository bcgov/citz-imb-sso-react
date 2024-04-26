# Not Using a Proxy Pass

!!! warning "Important"
    This package is set up to use a proxy pass to the backend by default using `/api`.  
    This means that all traffic to `<frontend url>/api` will be directed to `<backend_url>`.  

### Configuration
To configure the package for not using a proxy pass, you will need to set `backendUrl` prop on `SSOProvider` component and `login` function.  
If you are using a proxy pass other than `/api` you can also set that here.

### `Example`

```JavaScript
// Example usage:
<SSOProvider backendURL="http://localhost:3000" idpHint="idir">
  <App />
</SSOProvider>

// Example usage: 
login({ backendURL: "http://localhost:3000", idpHint: "idir" });
```

