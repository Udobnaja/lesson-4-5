FROM node:8.4.0
WORKDIR /app

COPY package*.json ./
ENV NODE_ENV=development
RUN npm install --quient
COPY . .
RUN npm run clone

CMD npm run start
