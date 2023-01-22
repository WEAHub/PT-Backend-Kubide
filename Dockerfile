FROM node:19
WORKDIR /app
COPY package*.json ./
COPY .docker.env ./.env
RUN npm install
COPY . .
RUN npm run build
CMD [ "node", "dist/main.js" ]