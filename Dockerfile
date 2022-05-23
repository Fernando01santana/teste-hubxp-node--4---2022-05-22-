FROM node:16.14.0-alpine

WORKDIR /fernando/src/app
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 6363
CMD [ "node","dist/main" ]