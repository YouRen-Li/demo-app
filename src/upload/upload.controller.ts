/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
  ParseFilePipeBuilder,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { UploadService } from './upload.service';
import { ALLOWED_MIME_TYPES, UPLOAD_CONFIG } from './upload.types';
import type {
  FileFilterCallback,
  FileNameCallback,
  UploadFileResponse,
  UploadMultipleFilesResponse,
} from './upload.types';

@ApiTags('文件上传')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @ApiOperation({ summary: '上传单个文件' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: '要上传的文件',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: '文件上传成功',
    schema: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
          example: '/uploads/file-1234567890-123456789.jpg',
        },
        filename: { type: 'string', example: 'file-1234567890-123456789.jpg' },
        originalname: { type: 'string', example: 'photo.jpg' },
        size: { type: 'number', example: 102400 },
        mimetype: { type: 'string', example: 'image/jpeg' },
      },
    },
  })
  @ApiResponse({ status: 400, description: '文件验证失败' })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: UPLOAD_CONFIG.UPLOAD_DESTINATION,
        filename: (
          req: Express.Request,
          file: Express.Multer.File,
          callback: FileNameCallback,
        ) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (
        req: Express.Request,
        file: Express.Multer.File,
        callback: FileFilterCallback,
      ) => {
        if (ALLOWED_MIME_TYPES.includes(file.mimetype as any)) {
          callback(null, true);
        } else {
          callback(
            new BadRequestException(
              `不支持的文件类型: ${file.mimetype}。仅支持图片、PDF 和 Word 文档`,
            ),
            false,
          );
        }
      },
      limits: {
        fileSize: UPLOAD_CONFIG.MAX_FILE_SIZE,
      },
    }),
  )
  uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({
          maxSize: UPLOAD_CONFIG.MAX_FILE_SIZE,
          message: '文件大小不能超过 5MB',
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ): UploadFileResponse {
    if (!file) {
      throw new BadRequestException('请选择要上传的文件');
    }

    return {
      url: `/uploads/${file.filename}`,
      filename: file.filename,
      originalname: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
    };
  }

  @Post('multiple')
  @ApiOperation({ summary: '上传多个文件' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
          description: '要上传的多个文件（最多 10 个）',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: '文件上传成功',
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              url: { type: 'string' },
              filename: { type: 'string' },
              originalname: { type: 'string' },
              size: { type: 'number' },
              mimetype: { type: 'string' },
            },
          },
        },
      },
    },
  })
  @UseInterceptors(
    FilesInterceptor('files', UPLOAD_CONFIG.MAX_FILES, {
      storage: diskStorage({
        destination: UPLOAD_CONFIG.UPLOAD_DESTINATION,
        filename: (
          req: Express.Request,
          file: Express.Multer.File,
          callback: FileNameCallback,
        ) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (
        req: Express.Request,
        file: Express.Multer.File,
        callback: FileFilterCallback,
      ) => {
        if (ALLOWED_MIME_TYPES.includes(file.mimetype as any)) {
          callback(null, true);
        } else {
          callback(
            new BadRequestException(`不支持的文件类型: ${file.mimetype}`),
            false,
          );
        }
      },
      limits: {
        fileSize: UPLOAD_CONFIG.MAX_FILE_SIZE,
      },
    }),
  )
  uploadMultipleFiles(
    @UploadedFiles() files: Express.Multer.File[],
  ): UploadMultipleFilesResponse {
    if (!files || files.length === 0) {
      throw new BadRequestException('请至少选择一个文件');
    }

    return {
      files: files.map((file) => ({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        url: `/uploads/${file.filename}`,
        filename: file.filename,
        originalname: file.originalname,
        size: file.size,
        mimetype: file.mimetype,
      })),
    };
  }
}
