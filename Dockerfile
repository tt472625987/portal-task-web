# Install dependencies only when needed
# ----------- Step 1: Install dependencies ------------
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Build the project
# ----------- Step 2: Build project -------------------
FROM node:20-alpine AS builder
WORKDIR /app

# ✅ 构建阶段允许传入数据库连接（但不存进镜像）
ARG DATABASE_URL
ARG DIRECT_URL

# 设置为环境变量供 build 阶段使用
ENV DATABASE_URL=$DATABASE_URL
ENV DIRECT_URL=$DIRECT_URL

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

# Production image
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["node_modules/.bin/next", "start"]
