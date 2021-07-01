# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
ENV VUE_APP_PUBLIC_PATH <PUBLIC_PATH_REPLACE>
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY entrypoint.sh /docker-entrypoint.d/00-ui-replace-placeholders.sh
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]