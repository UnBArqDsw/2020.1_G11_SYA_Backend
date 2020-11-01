FROM node:14.11

WORKDIR /app/sya

RUN apt-get update && apt-get install -y netcat

COPY package*.json ./
COPY yarn*.lock ./
RUN yarn install --production=false

EXPOSE 8080
CMD ["yarn", "start"]
