FROM node:15.11.0-alpine

WORKDIR /app

COPY "package.json" ".sequelizerc" ./
COPY "dist" ./dist
RUN npm config set update-notifier false > "/dev/null" 2>&1
RUN npm install --silent
RUN npm run migrate:production
CMD ["npm", "start"]