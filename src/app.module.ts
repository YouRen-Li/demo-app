import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'; // 👈 1. 引入 ConfigModule
import { TodoModule } from './todo/todo.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
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
  ],
})
export class AppModule {}
