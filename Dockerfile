FROM node:8.4.0
ENV NODE_ENV='production'
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm run clone
COPY . .
CMD npm start -- --port $PORT
