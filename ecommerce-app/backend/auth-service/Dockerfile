# Step 1: Use lightweight Node.js base image
FROM node:18-alpine

# Step 2: Set working directory inside container
WORKDIR /app

# Step 3: Copy dependency definitions first (optimizes layer caching)
COPY package*.json ./

# Step 4: Install production dependencies
RUN npm install --only=production

# Step 5: Copy application source code
COPY . .

# Step 6: Expose Auth Service port
EXPOSE 5001

# Step 7: Define startup command
CMD ["npm", "start"]
