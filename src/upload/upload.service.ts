import { Injectable, BadRequestException } from '@nestjs/common';
import { existsSync, mkdirSync, unlinkSync, statSync } from 'fs';
import { join } from 'path';

@Injectable()
export class UploadService {
  private readonly uploadPath = './uploads';

  constructor() {
    // 确保上传目录存在
    this.ensureUploadDirectory();
  }

  /**
   * 确保上传目录存在，不存在则创建
   */
  private ensureUploadDirectory(): void {
    if (!existsSync(this.uploadPath)) {
      mkdirSync(this.uploadPath, { recursive: true });
      console.log(`✅ 创建上传目录: ${this.uploadPath}`);
    }
  }

  /**
   * 验证文件类型是否允许
   */
  validateFileType(mimetype: string): boolean {
    const allowedMimes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    return allowedMimes.includes(mimetype);
  }

  /**
   * 验证文件大小
   */
  validateFileSize(size: number, maxSize: number = 5 * 1024 * 1024): boolean {
    return size <= maxSize;
  }

  /**
   * 删除文件
   */
  deleteFile(filename: string): boolean {
    try {
      const filePath = join(this.uploadPath, filename);
      if (existsSync(filePath)) {
        unlinkSync(filePath);
        return true;
      }
      return false;
    } catch (error) {
      throw new BadRequestException(`删除文件失败: ${error}`);
    }
  }

  /**
   * 获取文件信息
   */
  getFileInfo(filename: string) {
    try {
      const filePath = join(this.uploadPath, filename);
      if (!existsSync(filePath)) {
        throw new BadRequestException('文件不存在');
      }

      const stats = statSync(filePath);
      return {
        filename,
        size: stats.size,
        createdAt: stats.birthtime,
        modifiedAt: stats.mtime,
      };
    } catch (error) {
      throw new BadRequestException(`获取文件信息失败: ${error}`);
    }
  }

  /**
   * 格式化文件大小
   */
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  }
}
