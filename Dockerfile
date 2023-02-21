FROM node:10
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install --only=dev
COPY . .
EXPOSE 5007

CMD ["npm", "start"]
