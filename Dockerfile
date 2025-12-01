# Use official Node.js LTS
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and lock file
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy source code
COPY . .

# Build the project
RUN npm run build

# Expose port
EXPOSE 3000

# Run the application
CMD ["node", "dist/main.js"]
