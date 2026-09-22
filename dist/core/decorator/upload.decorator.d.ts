export declare const UPLOAD_FILES_KEY = "upload-files";
export interface UploadFieldOptions {
    maxCount?: number;
    maxSize?: number;
    mimeTypes?: string[];
}
export interface UploadFilesOptions {
    [fieldName: string]: UploadFieldOptions;
}
export declare const UploadFiles: (options: UploadFilesOptions) => import("@nestjs/common").CustomDecorator<string>;
