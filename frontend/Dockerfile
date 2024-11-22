# frontend/Dockerfile

# Stage 1: Build React app
FROM node:18 AS build
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies with npm ci
RUN npm ci

# Copy the rest of the application files and build the app
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:1.21-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
