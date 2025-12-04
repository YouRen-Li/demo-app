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
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import CreateTodoDto from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('待办事项')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @ApiOperation({ summary: '创建待办', description: '创建一个新的待办事项' })
  create(@Body() createTodoDto: CreateTodoDto, @Req() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return this.todoService.create(createTodoDto, req.user.userId);
  }

  @Get()
  @ApiOperation({
    summary: '获取待办列表',
    description: '分页获取当前用户的待办事项',
  })
  @ApiQuery({ name: 'page', description: '页码', required: false, example: 1 })
  @ApiQuery({
    name: 'limit',
    description: '每页数量',
    required: false,
    example: 10,
  })
  findAll(
    @Req() req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return this.todoService.findAll(req.user.userId, +page, +limit);
  }

  @Get(':id')
  @ApiOperation({
    summary: '获取待办详情',
    description: '根据 ID 获取单个待办事项',
  })
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新待办', description: '根据 ID 更新待办事项' })
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除待办', description: '根据 ID 删除待办事项' })
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
