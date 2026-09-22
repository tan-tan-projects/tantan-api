var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, HttpException, HttpStatus, } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import multer, { memoryStorage } from 'multer';
import { Observable } from 'rxjs';
import { UPLOAD_FILES_KEY, } from '../decorator/upload.decorator.js';
let FileUploadInterceptor = class FileUploadInterceptor {
    reflector;
    constructor(reflector) {
        this.reflector = reflector;
    }
    intercept(context, next) {
        const options = this.reflector.get(UPLOAD_FILES_KEY, context.getHandler());
        if (!options)
            return next.handle();
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        if (!request.is('multipart/form-data')) {
            return next.handle();
        }
        const fields = Object.entries(options).map(([name, config]) => ({
            name,
            maxCount: config.maxCount ?? 1,
        }));
        const maxSize = Math.max(...Object.values(options).map((config) => config.maxSize ?? 5 * 1024 * 1024));
        let uploadError = null;
        const upload = multer({
            storage: memoryStorage(),
            limits: {
                fileSize: maxSize,
            },
            fileFilter: (_request, file, callback) => {
                const config = options[file.fieldname];
                if (!config) {
                    uploadError = `File field ${file.filename} is not allowed`;
                    return callback(null, false);
                }
                if (config.mimeTypes && !config.mimeTypes.includes(file.mimetype)) {
                    uploadError = `File ${file.originalname} has an unsupported MIME type ${file.mimetype}.`;
                    return callback(null, false);
                }
                callback(null, true);
            },
        }).fields(fields);
        return new Observable((subscriber) => {
            upload(request, response, (error) => {
                if (error) {
                    if (error instanceof multer.MulterError) {
                        if (error.code === 'LIMIT_FILE_SIZE') {
                            return subscriber.error(new HttpException('File size exceeds the allowed limit', HttpStatus.BAD_REQUEST));
                        }
                        return subscriber.error(new HttpException(error.message, HttpStatus.BAD_REQUEST));
                    }
                    return subscriber.error(new HttpException(error instanceof Error
                        ? error.message
                        : 'File upload failed', HttpStatus.BAD_REQUEST));
                }
                if (uploadError) {
                    return subscriber.error(new HttpException(uploadError, HttpStatus.BAD_REQUEST));
                }
                next.handle().subscribe({
                    next: (value) => subscriber.next(value),
                    error: (error) => subscriber.error(error),
                    complete: () => subscriber.complete(),
                });
            });
        });
    }
};
FileUploadInterceptor = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Reflector])
], FileUploadInterceptor);
export { FileUploadInterceptor };
//# sourceMappingURL=upload.interceptor.js.map