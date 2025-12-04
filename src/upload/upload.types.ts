import { Request } from 'express';

/**
 * 文件过滤回调函数类型
 */
export type FileFilterCallback = (
  error: Error | null,
  acceptFile: boolean,
) => void;

/**
 * 文件名回调函数类型
 */
export type FileNameCallback = (error: Error | null, filename: string) => void;

/**
 * 允许的文件 MIME 类型
 */
export const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
] as const;

/**
 * 文件上传配置常量
 */
export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_FILES: 10, // 最多上传 10 个文件
  UPLOAD_DESTINATION: './uploads',
} as const;

/**
 * 文件上传响应接口
 */
export interface UploadFileResponse {
  url: string;
  filename: string;
  originalname: string;
  size: number;
  mimetype: string;
}

/**
 * 多文件上传响应接口
 */
export interface UploadMultipleFilesResponse {
  files: UploadFileResponse[];
}
