FROM node:alpine as builder

WORKDIR /usr/app

RUN npm install -g @angular/cli

COPY ./package*.json ./
RUN npm install

COPY . .

RUN ng build

FROM nginx
EXPOSE 4200
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/app/dist/ckret-frontend /usr/share/nginx/html