FROM node:20.9.0

WORKDIR /messages

COPY package.json .

RUN npm i

COPY . .

CMD ["npm", "run", "dev"]