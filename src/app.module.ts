import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm'; // 引入typeorm

@Module({
  imports: [
    // 配置数据库连接
    TypeOrmModule.forRoot({
      // 👇 重点检查这里！必须是 postgres
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root', // 对应 docker-compose 里的 POSTGRES_USER
      password: 'root', // 对应 docker-compose 里的 POSTGRES_PASSWORD
      database: 'todo_db', // 对应 docker-compose 里的 POSTGRES_DB
      autoLoadEntities: true,
      synchronize: true,
    }),
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
