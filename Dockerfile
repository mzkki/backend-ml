# Use the official Node.js 20 base image
FROM node:20-slim

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Copy application code
COPY . .

EXPOSE 3000

# Set the command to start the server
CMD ["npm", "start"]