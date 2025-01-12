# Base Image
FROM node:18

# Create App Directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN npm ci

#Build app source
COPY . .

EXPOSE 8080

CMD ["npm","run","dev"]


