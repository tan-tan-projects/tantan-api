import type { JwtPayload } from '../core/jwt/guard/payload.js';
import { RepoService } from '../shares/repo/repo.service.js';
import { Resource } from './entities/resource.entity.js';
import { CloudinaryService } from '../shares/cloudinary/cloudinary.service.js';
import { QueryDTO } from '../shares/repo/dto/query.dto.js';
type ResourceType = 'image' | 'video' | 'raw';
export declare class ResourcesService {
    readonly repo: RepoService;
    readonly cloudinary: CloudinaryService;
    constructor(repo: RepoService, cloudinary: CloudinaryService);
    signature(user: JwtPayload, folder?: string, resourceType?: ResourceType): Promise<{
        timestamp: number;
        signature: string;
        api_key: string;
        cloud_name: string;
        upload_preset: string;
        folder: string;
        resourceType: string;
        mediaId: string;
    }>;
    complete(userId: string, mediaId: string, publicId: string): Promise<Resource | undefined>;
    failed(userId: string, mediaId: string, message?: string): Promise<Resource>;
    usage(): Promise<any>;
    folders(): Promise<any>;
    subFolders(folder: string): Promise<any>;
    files(folder?: string, nextCursor?: string): Promise<any>;
    removeCloudinary(publicId: string): Promise<{
        success: boolean;
        publicId: string;
        result: any;
    }>;
    findAll(query: QueryDTO): Promise<[Resource[], number]>;
    remove(id: string): Promise<{
        success: boolean;
        id: string;
    }>;
}
export {};
