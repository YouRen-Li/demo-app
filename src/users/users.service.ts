import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm'; // 👈 4. 引入 InjectRepository
import { Repository } from 'typeorm'; // 👈 3. 引入 Repository
import { User } from './entities/user.entity'; // 👈 2. 引入 User 实体
import * as bcrypt from 'bcryptjs'; // 👈 1. 引入加密库

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // 2. 检查用户名是否已存在 (防止重复注册)
    const existingUser = await this.usersRepository.findOne({
      where: { username: createUserDto.username },
    });
    if (existingUser) {
      throw new BadRequestException('用户名已存在');
    }

    // 3. 给密码加密 (加盐)
    // bcrypt.hash(明文, 难度系数)
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // 4. 创建新用户对象，把明文密码换成加密密码
    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword, // 👈 偷梁换柱
    });

    // 5. 保存
    return this.usersRepository.save(newUser);
  }

  findAll() {
    return `This action returns all users`;
  }

  // ... 查单个用户 (登录要用)
  async findOne(username: string) {
    return this.usersRepository.findOne({ where: { username } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
