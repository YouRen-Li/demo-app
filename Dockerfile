# 1. 使用 Node.js 环境作为基础
FROM node:18-alpine

# 2. 设置工作目录
WORKDIR /app

# 3. 复制依赖文件
COPY package*.json pnpm-lock.yaml ./

# ⚠️⚠️⚠️ 强制覆盖 Docker Desktop 的自动注入 ⚠️⚠️⚠️
# 即使 Docker 设置里有代理，这两行也会让它在容器里失效
ENV HTTP_PROXY=""
ENV HTTPS_PROXY=""

# 4. 安装依赖 (确保删除 npm 内部配置)
RUN npm config delete proxy && \
    npm config delete https-proxy && \
    npm install -g pnpm && \
    pnpm install

# 5. 复制所有源代码
COPY . .

# 6. 编译代码
RUN pnpm build

# 7. 暴露端口
EXPOSE 3000

# 8. 启动命令
CMD ["node", "dist/main"]