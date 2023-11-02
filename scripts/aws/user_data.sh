#!/bin/bash

# Restart the server
if [ -d "/var/frontend" ]; then
    cd "/var/frontend"
    pm2 delete all
    pm2 --name fronend start "node_modules/next/dist/bin/next start --port 80"
else
    systemctl enable httpd
    rm -rf /var/www/html/api
    mkdir /var/www/html/api
    mkdir /var/www/html/api/health-check
    echo "INIT: Root" > /var/www/html/index.html
    echo "INIT health-check" > /var/www/html/api/health-check/index.html
    systemctl start httpd
fi
