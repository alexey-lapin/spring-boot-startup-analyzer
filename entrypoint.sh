#!/bin/sh
set -e
: "${UI_PUBLIC_PATH:=}"

sed -i "s@/<PUBLIC_PATH_REPLACE>@$UI_PUBLIC_PATH@g" /usr/share/nginx/html/index.html
sed -i "s@/<PUBLIC_PATH_REPLACE>@$UI_PUBLIC_PATH@g" /usr/share/nginx/html/assets/index*.js
sed -i "s@/<PUBLIC_PATH_REPLACE>@$UI_PUBLIC_PATH@g" /usr/share/nginx/html/assets/index*.css
