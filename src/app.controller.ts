import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('系统管理')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: '系统健康检查',
    description: '返回 Hello World 确认服务存活',
  })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/test')
  @ApiOperation({ summary: '测试接口', description: '返回测试内容' })
  getTest(): string {
    return this.appService.getTestContent();
  }

  @Get('greet')
  @ApiOperation({ summary: '打招呼', description: '根据名字打招呼' })
  saiHi(@Query('name') name: string): string {
    return `你好，${name}!`;
  }

  @Post('/login')
  @ApiOperation({
    summary: '测试登录',
    description: '这是一个测试用的登录接口',
  })
  // eslint-disable-next-line
  login(@Body() body: any) {
    // eslint-disable-next-line
    return this.appService.checkLogin(body.username, body.password);
  }
}
