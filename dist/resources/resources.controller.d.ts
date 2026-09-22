import { ResourcesService } from './resources.service.js';
import type { JwtPayload } from '../core/jwt/guard/payload.js';
import { QueryDTO } from '../shares/repo/dto/query.dto.js';
export declare class ResourcesController {
    private readonly service;
    constructor(service: ResourcesService);
    signature(user: JwtPayload, dto?: {
        folder: string;
    }): Promise<{
        timestamp: number;
        signature: string;
        api_key: string;
        cloud_name: string;
        upload_preset: string;
        folder: string;
        resourceType: string;
        mediaId: string;
    }>;
    complete(user: JwtPayload, body: {
        mediaId: string;
        publicId: string;
    }): Promise<import("./entities/resource.entity.js").Resource | undefined>;
    failed(user: JwtPayload, body: {
        mediaId: string;
        message?: string;
    }): Promise<import("./entities/resource.entity.js").Resource>;
    usage(): Promise<any>;
    folders(): Promise<any>;
    subFolders(folder: string): Promise<any>;
    files(folder?: string, nextCursor?: string): Promise<any>;
    findAll(query: QueryDTO): Promise<[import("./entities/resource.entity.js").Resource[], number]>;
    removeCloudinary(publicId: string): Promise<{
        success: boolean;
        publicId: string;
        result: any;
    }>;
    remove(id: string): Promise<{
        success: boolean;
        id: string;
    }>;
}
