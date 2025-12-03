# Use official Node.js LTS
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and lock file
COPY package*.json ./

# Install dependencies
RUN npm install

# Expose port
EXPOSE 3000

# Default command in dev
CMD ["npm", "run", "start:dev"]
