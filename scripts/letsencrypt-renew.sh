#!/usr/bin/env bash

# This script is for hooking up to a cronjob and automatically renewing the certificate
# while the webserver is running.

# The first command will check the expiration on the certificate and kick off a renewal
# process when its due. The running Nginx server will act as a proxy for the Certbot
# certificate validation. The second command sends a SIGHUP signal to Nginx, which
# forces it to reload its configuration, including certificates, without interrupting service.

echo "Starting script - $(date)"

pushd /website > /dev/null

echo "Checking if certificate needs to be renewed..."
docker compose -f docker-compose.prod.yml up letsencrypt

echo "Asking nginx to reload..."
docker compose exec webserver nginx -s reload

popd > /dev/null

echo "Done."
echo ""

