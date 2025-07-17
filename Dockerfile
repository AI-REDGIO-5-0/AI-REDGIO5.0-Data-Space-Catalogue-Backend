# Use Node base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install redis-cli
RUN apk add --no-cache redis

# Copy package files and install dependencies
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install dependencies (with pnpm support)
RUN npm install -g pnpm && pnpm install

# Copy the rest of the project
COPY . .

# Build the app
RUN pnpm run build

# Ensure the `dist` directory exists
RUN ls -la dist

# Run migrations (adjust the command based on your ORM)
# RUN pnpm run mikro:migrate:up

# Expose port
EXPOSE 3000

# Run the app
CMD ["sh", "-c", "node dist/mikro-orm.config.js && node dist/src/main.js"]