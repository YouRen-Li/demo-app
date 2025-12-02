import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getTestContent(): string {
    return '这是我的第一个 NestJS 接口';
  }

  checkLogin(username: string, password: string) {
    if (username === 'admin' && password === '123456') {
      return {
        code: 200,
        message: '登录成功',
        data: {
          token: 'mock-token-88888888',
          userName: username,
        },
      };
    } else {
      return {
        code: 401,
        message: '账号或密码错误',
        data: null,
      };
    }
  }
}
