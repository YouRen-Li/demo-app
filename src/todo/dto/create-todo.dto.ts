import { IsString, IsInt, IsNotEmpty, IsOptional } from 'class-validator'; //引入校验库

// 这里定义的是前端发给后端的数据
// 所以id不需要后端传   id: number;
// 服务器时间也不能后端传   createdAt: string;  updatedAt: string;
// 保留前端需要填写的字段即可
export default class CreateTodoDto {
  @IsString({ message: '名称必须是字符串' })
  @IsNotEmpty({ message: '任务名称不能为空' })
  name: string;

  @IsInt({ message: '状态必须是整数' })
  @IsOptional()
  status: number;

  @IsString()
  @IsOptional()
  description: string;
}
