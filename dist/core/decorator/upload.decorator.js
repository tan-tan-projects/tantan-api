import { SetMetadata } from '@nestjs/common';
export const UPLOAD_FILES_KEY = 'upload-files';
export const UploadFiles = (options) => SetMetadata(UPLOAD_FILES_KEY, options);
//# sourceMappingURL=upload.decorator.js.map