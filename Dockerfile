# Step 1: Build the React app
FROM node:18 AS build

# Install qpdf
RUN apt-get update && apt-get install -y qpdf \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /usr/src/app

# Copy only the frontend package.json and lock file to install dependencies
COPY ./frontend/package.json ./frontend/package-lock.json ./frontend/

# Install dependencies for the frontend
WORKDIR /usr/src/app/frontend
RUN npm install

# Copy the rest of the frontend files (including public and src folders)
COPY ./frontend .

# Build the React app
RUN npm run build

# Step 2: Set up the backend and serve the React app
FROM node:18

WORKDIR /usr/src/app

# Copy backend package files and install dependencies
COPY ./backend/package.json ./backend/package-lock.json ./backend/
COPY --from=build /usr/src/app/frontend/build ./backend/public

WORKDIR /usr/src/app/backend
RUN npm install

# Copy backend files
COPY ./backend .

# Expose the backend port
EXPOSE 5000

# Start the backend server
CMD ["npm", "start"]
