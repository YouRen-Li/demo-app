import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'; // 👈 1. 引入 ConfigModule
import { TodoModule } from './todo/todo.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    // 👇 1. 开启静态文件服务
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // 指向根目录下的 uploads 文件夹
      serveRoot: '/uploads', // 访问前缀 http://localhost:3000/uploads/xxx.jpg
    }),

    // 👇 2. 先注册 ConfigModule，让它去读 .env
    ConfigModule.forRoot({
      isGlobal: true, // 让配置在全网通用，不用每个模块都导入
    }),

    // 👇 3. 数据库配置改用 process.env 读取
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST, // 读取 .env 里的 DB_HOST
      port: parseInt(process.env.DB_PORT || '5432'), // 读取端口并转为数字
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    TodoModule,
    UsersModule,
    AuthModule,
    UploadModule,
  ],
})
export class AppModule {}
