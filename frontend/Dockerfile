FROM node:alpine3.21 as base

WORKDIR /app

COPY package.json .

RUN npm i 

COPY . .

EXPOSE 5173

CMD ["npm", "run","dev"]
