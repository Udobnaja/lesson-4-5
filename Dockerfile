FROM node:8.4.0
WORKDIR /app

COPY . .
ENV PORT=3000
ENV NODE_ENV=development
RUN npm install --quient
RUN npm run clone
CMD npm start -- --port $PORT
