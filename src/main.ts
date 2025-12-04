import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // 引入 ValidationPipe
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'; //引入 Swagger
import { TransformInterceptor } from './common/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 开启全局验证管道
  app.useGlobalPipes(new ValidationPipe());

  // 配置 Swagger 文档信息
  const config = new DocumentBuilder()
    .setTitle('我的 Todo App 接口')
    .setDescription('这是一个用来学习 NestJS 的示范项目')
    .setVersion('1.0')
    .addBearerAuth() // 添加认证
    .build();

  // 创建文档
  const document = SwaggerModule.createDocument(app, config);
  // 挂载文档
  SwaggerModule.setup('api', app, document);

  // 👇 注册全局拦截器
  app.useGlobalInterceptors(new TransformInterceptor());

  // 👇 开启跨域允许 (允许所有前端访问)
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
