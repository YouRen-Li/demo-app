// 定义实体类
// 数据最终存在数据库里的完整样子，必须包含前端和后端所有的数据结构
export class Todo {
  id: number;
  name: string;
  status: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}
