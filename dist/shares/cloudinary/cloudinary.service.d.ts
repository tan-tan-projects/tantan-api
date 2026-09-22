import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
export declare class CloudinaryService {
    constructor(config: ConfigService);
    getClient(): typeof cloudinary;
    createSignature(folder: string, resourceType: string): {
        timestamp: number;
        signature: string;
        api_key: string;
        cloud_name: string;
        upload_preset: string;
        folder: string;
        resourceType: string;
    };
    getResource(publicId: string): Promise<any>;
    getUsage(): Promise<any>;
    getRootFolders(): Promise<any>;
    getSubFolders(folder: string): Promise<any>;
    getFiles(folder?: string, nextCursor?: string): Promise<any>;
    destroy(publicId: string): Promise<any>;
    uploadImage(file: Express.Multer.File): Promise<UploadApiResponse>;
    destroyImage(imageUrl: string): Promise<void>;
    private getPublicIdFromUrl;
}
