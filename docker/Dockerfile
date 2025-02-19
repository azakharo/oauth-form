# build
FROM node:20.14.0-alpine as build-step
RUN mkdir -p /app
RUN npm cache clear --force
WORKDIR /app
COPY package.json package-lock.json /app
RUN npm install
COPY . /app
ARG mode=production
RUN npm run build -- --mode $mode

# run
FROM nginx:alpine
COPY --from=build-step /app/dist /usr/share/nginx/html
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]
