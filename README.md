# Demo App

> [!IMPORTANT]
> **历史部署演示，已停止维护。** 本仓库用于练习 NestJS、PostgreSQL、JWT 与 Docker 部署，文中的占位 IP 和示例凭据不能直接用于生产。较新的完整商城后端练习请查看 [shopping_cart_afterEnd](https://github.com/YouRen1320/shopping_cart_afterEnd)。代码和提交历史继续保留。

基于 NestJS 框架构建的 RESTful API 服务，支持 Docker 容器化部署。

## 🛠 技术栈

- **框架**: NestJS 11
- **数据库**: PostgreSQL 15
- **ORM**: TypeORM
- **认证**: JWT + Passport
- **容器化**: Docker + Docker Compose
- **包管理**: pnpm

## 📁 项目结构

```
src/
├── auth/          # 认证模块（登录、注册、JWT）
├── users/         # 用户管理
├── todo/          # Todo 示例模块
├── upload/        # 文件上传
├── common/        # 公共模块
├── app.module.ts  # 根模块
└── main.ts        # 入口文件
```

## 🚀 快速开始

### 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm start:dev

# 启动数据库（Docker）
docker-compose up -d postgres
```

### Docker 本地运行

```bash
docker-compose up -d
```

访问：<http://localhost:3000>

---

## 📦 服务器部署

### 1. 构建 AMD64 镜像（Mac M系列芯片必须）

```bash
docker buildx build --platform linux/amd64 -t demo-app-api:amd64 . --load
```

### 2. 导出镜像

```bash
docker save demo-app-api:amd64 -o app-api-amd64.tar
```

### 3. 上传到服务器

```bash
scp app-api-amd64.tar docker-compose.server.yml root@xx.xx.xx.xx:/root/demo-app/
```

### 4. 服务器部署

```bash
ssh root@xx.xx.xx.xx

cd /root/demo-app

# 停止旧容器
docker-compose -f docker-compose.server.yml down

# 删除旧镜像（如果存在）
docker rmi demo-app-api:amd64 2>/dev/null

# 加载新镜像
docker load -i app-api-amd64.tar

# 启动服务
docker-compose -f docker-compose.server.yml up -d

# 查看日志
docker logs nest-api --tail 50
```

---

## 🔧 环境变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| DB_HOST | 数据库地址 | postgres |
| DB_PORT | 数据库端口 | 5432 |
| DB_USER | 数据库用户 | root |
| DB_PASSWORD | 数据库密码 | root |
| DB_NAME | 数据库名 | todo_db |

## 📡 API 端点

| 路径 | 说明 |
|------|------|
| `GET /api` | API 状态 |
| `POST /auth/login` | 用户登录 |
| `POST /auth/register` | 用户注册 |
| `GET /todo` | 获取待办列表 |
| `POST /upload` | 文件上传 |

---

## 🌐 线上地址

- **API**: <http://xx.xx.xx.xx:3000>
- **Swagger 文档**: <http://xx.xx.xx.xx:3000/api-docs>

## 📝 常用命令

```bash
# 查看容器状态
docker ps

# 查看日志
docker logs nest-api -f

# 重启服务
docker-compose -f docker-compose.server.yml restart

# 进入容器
docker exec -it nest-api sh
```
