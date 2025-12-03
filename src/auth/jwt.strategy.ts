import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      // 1. 获取 Token 的方式：从请求头 Authorization: Bearer <token> 里拿
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 2. 只有没过期的 Token 才能通过
      ignoreExpiration: false,
      // 3. 这里的密钥必须和发 Token 时用的密钥一模一样！
      secretOrKey: configService.get('JWT_SECRET') || 'defaultSecret',
    });
  }

  // 4. 验证通过后，NestJS 会自动把解密出来的数据 (payload) 挂载到 request.user 上
  validate(payload: any) {
    // payload 就是你登录时存进去的 { sub: user.id, username: ... }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    return { userId: payload.sub, username: payload.username };
  }
}
