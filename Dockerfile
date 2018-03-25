FROM node:8.4.0
WORKDIR /app
COPY . .
RUN npm install
RUN npm run clone
EXPOSE 8082
CMD ["npm", "start"]
