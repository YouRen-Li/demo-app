import { IsNotEmpty, IsString, MinLength } from 'class-validator';
// 别忘了在 Swagger 里能看到，需要加 ApiProperty（可选，但推荐）
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: '用户名' })
  @IsString()
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  @ApiProperty({ description: '密码', minLength: 6 })
  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  @MinLength(6, { message: '密码至少 6 位' }) // 👈 加上长度限制
  password: string;
}
