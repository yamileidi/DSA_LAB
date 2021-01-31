FROM node:14
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 9996/tcp
EXPOSE 9997/tcp
EXPOSE 9999/tcp
CMD [ "node", "queue.js" ]