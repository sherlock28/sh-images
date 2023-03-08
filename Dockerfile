FROM node:16-alpine as prod
WORKDIR /usr
COPY package.json ./
COPY ./src ./
COPY .env ./
RUN npm install --only=production
RUN npm install pm2 -g
EXPOSE 4100
CMD ["pm2-runtime","index.js"]
