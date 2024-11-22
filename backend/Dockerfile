# backend/Dockerfile
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the backend files
COPY . .

# Expose the backend port
EXPOSE 5000

# Command to start the backend server
CMD ["npm", "run", "start"]
