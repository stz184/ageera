FROM node:18  as builder_base

WORKDIR /app


# Deps stage, preserve dependencies in cache as long as the lockfile isn't changed
FROM builder_base AS deps

COPY --link package*.json ./
COPY --link . .

RUN npm install
RUN npm run build


# Development image
FROM deps as dev

ENV NODE_ENV development

EXPOSE 3000
ENV PORT 3000

CMD ["npm", "run", "dev"]


# Production image, copy all the files
FROM deps AS prod
WORKDIR /app

ENV NODE_ENV production

CMD ["npm", "start"]

