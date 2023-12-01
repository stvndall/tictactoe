FROM node as build
LABEL authors="Steven"
WORKDIR /app
COPY package.json /app
COPY yarn.lock /app
RUN yarn install
COPY . /app
RUN yarn build

from nginx:alpine as production
COPY nginx_default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
