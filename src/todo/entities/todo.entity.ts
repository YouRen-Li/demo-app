import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity'; // 👈 1. 引入 User

// 定义实体类
// 数据最终存在数据库里的完整样子，必须包含前端和后端所有的数据结构
@Entity() // 告诉typeorm这是一个实体类
export class Todo {
  @PrimaryGeneratedColumn() // 主键自增
  id: number;

  @Column() // 任务名称
  name: string;

  @Column({ default: 0 }) // 默认状态是 0
  status: number;

  @Column({ nullable: true }) // 可以为空
  description: string;

  @CreateDateColumn() // 创建时自动填入时间
  createdAt: Date;

  @UpdateDateColumn() // 更新时自动填入时间
  updatedAt: Date;

  // 👇👇👇 新增这段：多对一关系
  // 读作：很多个 Todo 对应 一个 User
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @ManyToOne(() => User, (user) => user.todos)
  user: User;
}
