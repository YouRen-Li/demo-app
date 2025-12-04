import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'; // 👈 别忘了引入 bcrypt
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // 1. 登录主逻辑
  async signIn(username: string, pass: string) {
    // A. 找用户
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }

    // B. 比对密码 (用 bcrypt.compare)
    // pass 是前端传来的明文 '123456'
    // user.password 是数据库里的乱码 '$2b$10$...'
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('密码错误');
    }

    // C. 密码正确，生成 Token (Payload 里只存 id 和 username，不要存密码)
    const payload = { sub: user.id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload), // 👈 签发！
    };
  }

  // 2. 注册逻辑
  async register(registerDto: RegisterDto) {
    // A. 创建用户 (UsersService.create() 会处理密码加密和重复检查)
    const newUser = await this.usersService.create(registerDto);

    // B. 注册成功后自动登录，返回 token
    const payload = { sub: newUser.id, username: newUser.username };

    return {
      message: '注册成功',
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
