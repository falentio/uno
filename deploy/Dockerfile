FROM node:16-alpine as builder

WORKDIR /build
COPY *.json .
COPY packages/core/package.json packages/core/
COPY packages/emitter/package.json packages/emitter/
COPY apps/server/package.json apps/server/
COPY apps/web/package.json apps/web/
RUN npm install

COPY packages packages
COPY apps apps
RUN npm run build -ws --if-present

ENTRYPOINT ["npm", "run", "start", "-w", "@uno/server"]