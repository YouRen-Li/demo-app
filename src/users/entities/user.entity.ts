import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Todo } from '../../todo/entities/todo.entity';

@Entity() // 👈 标记为表
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true }) // 👈 用户名必须唯一，不能重复
  username: string;

  @Column()
  password: string; // ⚠️ 真实项目中密码要加密存储，后面我会教你用 bcrypt

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // 👇👇👇 新增这段：一对多关系
  // 读作：一个 User 拥有 很多个 Todo
  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
