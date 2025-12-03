import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import CreateTodoDto from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { AuthGuard } from '@nestjs/passport'; // 👈 1. 引入 AuthGuard
import { ApiBearerAuth } from '@nestjs/swagger'; // 👈 2. 让 Swagger 支持填 Token

@ApiBearerAuth() // 告诉 Swagger 这个接口需要 Token
@UseGuards(AuthGuard('jwt')) // 👈 3. 加上这行，整个 Controller 就都被保护了！
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  // 👇 2. 加上 @Req() req
  create(@Body() createTodoDto: CreateTodoDto, @Req() req) {
    // req.user 就是 JWT 解析出来的 { userId: 1, username: 'admin' }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return this.todoService.create(createTodoDto, req.user.userId);
  }

  @Get()
  // 👇 3. 加上 @Req() req
  findAll(@Req() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return this.todoService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
