# Dockerfile 
FROM node:lts-alpine

WORKDIR /app
COPY package.json package.json
RUN npm install

COPY public public
COPY codegen.ts codegen.ts
COPY next.config.js next.config.js
COPY tsconfig.json tsconfig.json

COPY src src


CMD npm run dev