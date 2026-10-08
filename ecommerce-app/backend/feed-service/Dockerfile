# Step 1: Use lightweight Node.js base image
FROM node:18-alpine

# Step 2: Set working directory inside container
WORKDIR /app

# Step 3: Copy dependency definitions first
COPY package*.json ./

# Step 4: Install production dependencies
RUN npm ci --only=production

# Step 5: Copy application source code
COPY . .

# Step 6: Expose Feed Service port
EXPOSE 5002

# Step 7: Define startup command
CMD ["npm", "start"]
