import { Injectable } from '@nestjs/common';
import CreateTodoDto from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  // 1.定义数组，模拟数据库用。默认是空数组
  private todos: Todo[] = [];

  // 增
  create(createTodoDto: CreateTodoDto) {
    const todo: Todo = {
      id: Date.now(), //传入时间戳
      name: createTodoDto.name, //name是前端传入
      status: createTodoDto.status, //status也是前端传入
      description: createTodoDto.description,
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
    };
    this.todos.push(todo);
    return '新增成功！';
  }

  // 查 查询全部列表数据
  findAll() {
    return this.todos;
  }

  // 查 查询某1条列表数据
  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = this.todos.find((item) => item.id == id);
    if (todo) {
      Object.assign(todo, updateTodoDto);
      return todo;
    }
    return null;
  }

  remove(id: number) {
    const index = this.todos.findIndex((item) => item.id == id);
    if (index > -1) {
      this.todos.splice(index, 1);
      return { deleted: true, id: id };
    }
    return { deleted: false, message: '没找到任务' };
  }
}
