# Server Dockerfile
FROM node:20-alpine

WORKDIR /app

# Install dependencies first
COPY server/package*.json ./server/
RUN cd server && npm ci --only=production

# Copy server source
COPY server ./server

# Set envs
ENV NODE_ENV=production
ENV PORT=4000
EXPOSE 4000

# Use dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

WORKDIR /app/server
CMD ["/usr/bin/dumb-init", "node", "server.js"]