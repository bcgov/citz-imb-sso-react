# Setting Up a Proxy Pass

!!! warning "Important"
    This package is set up to use a proxy pass to the backend by default using `/api`.  
    This means that all traffic to `<frontend url>/api` will be directed to `<backend_url>`.  

The following steps will help you set up a proxy pass using `vite` as your development server and `nginx` as your production server.

### Vite

Add this configuration to the `server` property of your vite config and be sure to replace `<backend-service-name>` and `<backend-port>`.  
For docker containers, this is the service name from the compose file.

#### `Example`

```JavaScript
proxy: {
  "/api": {
    target: "http://<backend-service-name>:<backend-port>/",
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, ""),
  },
},
```

### Nginx

Add this configuration to the `server` property of your nginx config and be sure to replace `<backend-service-name>` and `<backend-port>`.  
For docker containers, this is the service name from the compose file.

#### `Example`

```
location /api/ {
  proxy_pass http://<backend-service-name>:<backend-port>/;
  proxy_set_header Host $host;
}
```
