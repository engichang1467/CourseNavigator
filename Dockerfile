FROM node:latest

WORKDIR /courseNavigator

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]