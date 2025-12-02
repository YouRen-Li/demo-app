import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/test')
  getTest(): string {
    return this.appService.getTestContent();
  }

  @Get('greet')
  saiHi(@Query('name') name: string): string {
    return `你好，${name}!`;
  }

  @Post('/login')
  // eslint-disable-next-line
  login(@Body() body: any) {
    // eslint-disable-next-line
    return this.appService.checkLogin(body.username, body.password);
  }
}
