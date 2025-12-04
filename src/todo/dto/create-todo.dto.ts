import { IsString, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// 这里定义的是前端发给后端的数据
export default class CreateTodoDto {
  @ApiProperty({ description: '任务名称', example: '学习 NestJS' })
  @IsString({ message: '名称必须是字符串' })
  @IsNotEmpty({ message: '任务名称不能为空' })
  name: string;

  @ApiPropertyOptional({ description: '状态：0=未完成，1=已完成', example: 0 })
  @IsInt({ message: '状态必须是整数' })
  @IsOptional()
  status: number;

  @ApiPropertyOptional({ description: '任务描述', example: '完成第一个接口' })
  @IsString()
  @IsOptional()
  description: string;
}
