# EVTX Viewer (offline build) for Okta App Platform.
# Builds the Vite app in evtx-wasm/evtx-viewer and serves static files with nginx on 8080.
# The viewer makes no network calls at runtime: DuckDB and the wasm parser are bundled.
FROM cgr.dev/chainguard/wolfi-base@sha256:03c6561658909fc4eadd0b2dc717375df40a22cc05455b8f82f1f1974e7e4427 AS build
RUN apk add --no-cache 'nodejs-24>=24.22.1' npm
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npx vite build

FROM cgr.dev/chainguard/wolfi-base@sha256:03c6561658909fc4eadd0b2dc717375df40a22cc05455b8f82f1f1974e7e4427
RUN apk add --no-cache ca-certificates nginx-mainline \
    && mkdir -p /etc/nginx/conf.d /usr/share/nginx/html /run/nginx \
    && chown -R nonroot:nonroot /usr/share/nginx/html /run/nginx \
    && printf '%s\n' \
      'worker_processes auto;' \
      'pid /tmp/nginx.pid;' \
      'events { worker_connections 1024; }' \
      'http {' \
      '  include /etc/nginx/mime.types;' \
      '  types { application/wasm wasm; }' \
      '  default_type application/octet-stream;' \
      '  access_log /dev/stdout;' \
      '  error_log stderr notice;' \
      '  sendfile on;' \
      '  keepalive_timeout 65;' \
      '  client_body_temp_path /tmp/client_body;' \
      '  proxy_temp_path /tmp/proxy;' \
      '  fastcgi_temp_path /tmp/fastcgi;' \
      '  uwsgi_temp_path /tmp/uwsgi;' \
      '  scgi_temp_path /tmp/scgi;' \
      '  include /etc/nginx/conf.d/*.conf;' \
      '}' \
      > /etc/nginx/nginx.conf \
    && printf '%s\n' \
      'server {' \
      '  listen 8080 default_server;' \
      '  server_name _;' \
      '  root /usr/share/nginx/html;' \
      '  index index.html;' \
      '  gzip on;' \
      '  gzip_types application/wasm application/javascript text/css;' \
      '  location / { try_files $uri /index.html; }' \
      '}' \
      > /etc/nginx/conf.d/default.conf
COPY --from=build --chown=nonroot:nonroot /app/dist /usr/share/nginx/html
USER nonroot
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
