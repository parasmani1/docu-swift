# Step 1: Build the React app
FROM node:18 AS build

# Install qpdf (required for encryption)
RUN apt-get update && apt-get install -y qpdf \
    && rm -rf /var/lib/apt/lists/*

# Set working directory for the React app
WORKDIR /usr/src/app/frontend

# Copy only the frontend package.json and lock files to install dependencies
COPY ./frontend/package.json ./frontend/package-lock.json ./

# Install dependencies for the frontend
RUN npm install

# Copy the rest of the frontend files (including public and src folders)
COPY ./frontend ./

# Build the React app
RUN npm run build

# Step 2: Set up the backend and serve the React app
FROM node:18

# Install dependencies required for LibreOffice and qpdf
RUN apt-get update && apt-get install -y \
    qpdf \
    libreoffice \
    libreoffice-writer \
    && rm -rf /var/lib/apt/lists/*

# Install PM2 globally
RUN npm install -g pm2

# Set working directory for the backend
WORKDIR /usr/src/app/backend

# Copy backend package files to install dependencies
COPY ./backend/package.json ./backend/package-lock.json ./

# Install backend dependencies
RUN npm install

# Copy backend source code
COPY ./backend ./

# Copy built React app into the backend's public directory
COPY --from=build /usr/src/app/frontend/build ./public

# Expose the backend port
EXPOSE 5000

# Healthcheck to verify backend health
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 CMD curl -f http://localhost:5000 || exit 1

# Start the backend server with PM2
CMD ["pm2-runtime", "src/app.js"]
