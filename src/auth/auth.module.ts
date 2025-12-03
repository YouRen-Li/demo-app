import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module'; // 👈 1. 引入用户模块
import { JwtModule } from '@nestjs/jwt'; // 👈 2. 引入 JWT
import { ConfigModule, ConfigService } from '@nestjs/config'; // 👈 3. 引入配置 这里的作用是读取配置文件中的 jwt.secret

@Module({
  imports: [
    UsersModule, // 我们要去 UsersModule 里查用户名密码
    // 配置 JWT
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'), // 从 .env 读密钥
        signOptions: { expiresIn: '1d' }, // Token 有效期 1 天
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
