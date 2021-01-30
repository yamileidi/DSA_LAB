FROM node:14
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 9998/tcp
CMD [ "node", "client.js" ]