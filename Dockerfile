FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run dev

EXPOSE 3001

CMD ["npm", "dev"]
