# Using node alpine image
FROM node:19-alpine

# Set the working directory (could be any directory)
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files to the working directory
COPY . .

# Build the node server
RUN npm run build

# Run the node app
CMD ["npm", "start"]
