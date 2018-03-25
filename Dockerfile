FROM node:8.4.0
WORKDIR /app
RUN  ["tar", "-cvf", "git.tar.zip .git/"]
COPY . .
RUN npm install
RUN ["tar", "-xvzf", "git.tar.zip"]
CMD ["npm", "start"]
