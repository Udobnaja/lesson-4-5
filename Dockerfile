FROM node:8.4.0
ENV NODE_ENV='production'
WORKDIR /app
COPY . /app
RUN npm stat
RUN npm install
RUN npm run clone
EXPOSE 8082
CMD ["npm", "start"]
