FROM node:12-alpine

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install

COPY . /app/

RUN npm run build

RUN npx tsc server.ts 

CMD [ "npm", "start" ]