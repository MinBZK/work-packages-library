# Virtueel Inkomsten Loket met Yivi

The Virtueel Inkomsten Loket is digital front desk, which can be used to find out what allowances are available based on data in the Yivi app.

## Demo

For a limited time, a demo is available at [https://vil.tweede.golf].

## How to run

Before running the Proof of Concept, a few configuration options are needed:

- `HOSTNAME`: the hostname of the application (used to tell the irmaserver where to send the results)
- `YIVI_SERVER_URL`: the URL of the Yivi server
- `YIVI_TOKEN`: the token used to authenticate against the Yivi server
- `VIL_API_USERNAME`: the username of the VIL API
- `VIL_API_PASSWORD`: the password of the VIL API

## Yivi server configuration

In order to be able to run a complete setup, a configured [irmaserver](https://irma.app/docs/irma-server-lib/) is needed. The following is an example configuration of such a server (running behind a proxy):
```
production: true
sse: true
url: "https://irmaserver.example.com"
no_tls: true
no_auth: false

disclose_perms:
  - "irma-demo.discipl.demoVIL.*"
issue_perms:
  - "irma-demo.*"
```

For other configuration options, see: [https://irma.app/docs/getting-started/]. Make sure to protect the server by configuring the `IRMASERVER_REQUESTORS` with a secure token or key.

## Reverse proxy

It is advisable to run the app behind a reverse proxy. An example Nginx config, including the claim-page and the `irmaserver` is:
```
http {
  include /etc/nginx/mime.types;

  server {
    listen 80 default_server;
    return 301 https://vil.example.com$request_uri;
  }

  server {
    server_name vil.example.com;
    listen 80;

    location /public {
      root /var/www/html;
      index index.html;
    }

    location / {
      proxy_set_header Host $host;
      proxy_pass_request_headers on;

      proxy_pass http://vil:3000;
    }

    location /claim {
      proxy_set_header Host $host;
      proxy_pass_request_headers on;

      proxy_pass http://vil-claim:3000;
    }
  }

  server {
    server_name yivi.example.com;
    listen 80;

    location / {
      proxy_set_header Host $host;
      proxy_pass_request_headers on;

      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "Upgrade";

      proxy_pass http://yivi:8088;
    }
  }
}
```

## Claim card

To claim an allowance, a demo webpage is added. As we make use of Yivi, this could also be hosted by a third-party paying the allowances.
