FROM nginx:alpine

LABEL org.opencontainers.image.source=https://github.com/provenance-io/p8e-ui

ADD build/ /usr/share/nginx/html/

COPY nginx.conf /etc/nginx/nginx.conf
COPY env-substitution.sh /docker-entrypoint.d/30-env-substitution.sh
RUN chmod +x /docker-entrypoint.d/30-env-substitution.sh