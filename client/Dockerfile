FROM node:14
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 9997/tcp
EXPOSE 9996/tcp
CMD [ "node", "client.js" ]