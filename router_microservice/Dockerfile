FROM node:alpine

WORKDIR /usr/app/

RUN npm install -g pm2

COPY ./package*.json ./
RUN npm install

COPY . .

CMD [ "pm2-runtime", "npm", "--", "start" ]
