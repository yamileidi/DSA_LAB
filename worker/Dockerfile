FROM node:14
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 9999/tcp
CMD [ "node", "worker.js" ]