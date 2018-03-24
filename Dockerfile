FROM node:8.4.0
#ENV NPM_VERSION 5.7.1
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm clone:repo
COPY . .
EXPOSE 8082
CMD [ "npm", "start" ]

