import { Injectable } from '@nestjs/common';
import CreateTodoDto from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Repository } from 'typeorm'; // 引入仓库类型
import { InjectRepository } from '@nestjs/typeorm'; // 引入注入工具
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  // 构造函数注入
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  // 增
  async create(createTodoDto: CreateTodoDto) {
    const newTodo = this.todoRepository.create(createTodoDto); //创建内存对象
    return await this.todoRepository.save(newTodo); //写入数据库
  }

  // 查 查询全部列表数据
  async findAll() {
    return await this.todoRepository.find();
  }

  // 查 查询某1条列表数据
  async findOne(id: number) {
    return await this.todoRepository.findOne({ where: { id } });
  }

  // 改
  async update(id: number, updateTodoDto: UpdateTodoDto) {
    // update(条件, 新内容)
    await this.todoRepository.update(id, updateTodoDto);
    // 返回更新后的那个任务看看
    return this.findOne(id);
  }

  // 删
  async remove(id: number) {
    return await this.todoRepository.delete(id);
  }
}
