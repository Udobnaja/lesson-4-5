FROM node:8.4.0
WORKDIR /app

COPY . .
RUN npm install
RUN npm clone
CMD ["npm", "start"]
