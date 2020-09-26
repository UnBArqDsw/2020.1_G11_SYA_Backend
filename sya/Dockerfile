FROM node:14.11

WORKDIR /app/sya

COPY package*.json ./
RUN npm install

EXPOSE 8080
CMD ["npm", "start"]
