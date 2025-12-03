import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm'; // 引入TypeORM 模块
import { Todo } from './entities/todo.entity'; // 引入Todo 实体

@Module({
  imports: [TypeOrmModule.forFeature([Todo])], // 注册 Todo 模块
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
