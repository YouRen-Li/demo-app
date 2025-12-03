import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm'; // 1. 引入
import { User } from './entities/user.entity'; // 2. 引入实体

@Module({
  imports: [TypeOrmModule.forFeature([User])], // 👈 3. 注册！
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // 👈 4. 导出 Service，因为后面“登录模块”要用它来查用户
})
export class UsersModule {}
