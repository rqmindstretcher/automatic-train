# Stage 1: Build the React app
FROM node:14 as react-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ .
RUN npm run build

# Stage 2: Build the Express server
FROM node:14 as server-build
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install
COPY server/ .
RUN npm run build

# Stage 3: Combine React build and Express server
FROM node:14
WORKDIR /app
COPY --from=react-build /app/client/build ./client/build
COPY --from=server-build /app/server ./server
EXPOSE 3001
CMD ["node", "./server/index.js"]
