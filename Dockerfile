# syntax=docker/dockerfile:1

ARG NODE_VERSION=18
ARG PNPM_VERSION=8.10.2

FROM node:${NODE_VERSION} as builder

ARG VITE_API_HOST=http://localhost:8000

# Use production node environment by default.
ENV NODE_ENV=development
ENV VITE_API_HOST=${VITE_API_HOST}

# Install pnpm.
RUN --mount=type=cache,target=/root/.npm \
  npm install -g pnpm@${PNPM_VERSION}

WORKDIR /app

COPY package.json pnpm-lock.yaml tsconfig.json tsconfig.node.json ./

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.local/share/pnpm/store to speed up subsequent builds.
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
  pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

FROM nginx:latest

COPY --from=builder /app/dist/ /usr/share/nginx/html

# Expose the port that the application listens on.
EXPOSE 80