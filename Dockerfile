FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY app/package*.json ./

# Install production dependencies
RUN npm install --omit=dev

# Copy all project files (Safe with .dockerignore)
COPY app/ .

# Security: Create and use a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
# Ensure the user owns the directory to avoid permission issues
RUN chown -R appuser:appgroup /usr/src/app
USER appuser

EXPOSE 5000

# Start the application
CMD ["node", "app.js"]