FROM node:18-alpine

WORKDIR /testapp

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 3000
CMD ["node", "server.js"]
