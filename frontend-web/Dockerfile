# Stage 1: Build static assets using Node 24 LTS
FROM node:24-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Serve compiled assets using Caddy
FROM caddy:2-alpine AS runner
WORKDIR /usr/share/caddy

# Copy custom Caddyfile configuration
COPY Caddyfile /etc/caddy/Caddyfile

# Copy static assets from builder stage
COPY --from=builder /app/dist /usr/share/caddy

EXPOSE 80
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]