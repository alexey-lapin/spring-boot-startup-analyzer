#!/bin/sh
set -e
: "${UI_PUBLIC_PATH:=}"

sed -i "s@/__PUBLIC_PATH_REPLACE__@$UI_PUBLIC_PATH@g" /usr/share/nginx/html/index.html
sed -i "s@/__PUBLIC_PATH_REPLACE__@$UI_PUBLIC_PATH@g" /usr/share/nginx/html/assets/index*.js
sed -i "s@/__PUBLIC_PATH_REPLACE__@$UI_PUBLIC_PATH@g" /usr/share/nginx/html/assets/index*.css
