import { IsNotEmpty, IsString } from 'class-validator';
// 只要你开启了 nest-cli.json 里的 swagger 插件，下面这些字段就会自动显示在文档里
export class LoginDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
