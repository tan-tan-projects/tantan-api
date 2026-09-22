var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RepoService } from '../shares/repo/repo.service.js';
import { Resource } from './entities/resource.entity.js';
import { CloudinaryService } from '../shares/cloudinary/cloudinary.service.js';
let ResourcesService = class ResourcesService {
    repo;
    cloudinary;
    constructor(repo, cloudinary) {
        this.repo = repo;
        this.cloudinary = cloudinary;
    }
    async signature(user, folder = 'media', resourceType = 'image') {
        const repo = this.repo.getRepository(Resource);
        const req = repo.create({
            userId: user.id,
            publicId: '',
            resourceType,
            status: 'TEMPORARY',
            bytes: 0
        });
        const data = await repo.save(req);
        const signature = this.cloudinary.createSignature(folder, resourceType);
        return {
            mediaId: data.id,
            ...signature,
        };
    }
    async complete(userId, mediaId, publicId) {
        const repo = this.repo.getRepository(Resource);
        const media = await repo.findOne({ where: { id: mediaId, userId } });
        if (!media)
            throw new HttpException('Media not found', HttpStatus.NOT_FOUND);
        try {
            const asset = await this.cloudinary.getResource(publicId);
            if (!['image', 'row'].includes(asset.resource_type)) {
                throw new HttpException('File harus berupa image', HttpStatus.BAD_REQUEST);
            }
            if (asset.bytes > 3 * 1024 * 1024)
                throw new HttpException('File maximal 3 MB', HttpStatus.BAD_REQUEST);
            media.publicId = asset.public_id;
            media.resourceType = asset.resource_type;
            media.format = asset.format;
            media.bytes = asset.bytes;
            media.width = asset.width;
            media.height = asset.height;
            media.status = 'ATTACHED';
            return repo.save(media);
        }
        catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            await repo.remove(media);
            try {
                await this.cloudinary.destroy(publicId);
            }
            catch (cleanupError) {
                console.error('Failed to cleanup Cloudinary resource:', cleanupError);
                throw new HttpException('Failed to complete upload', HttpStatus.BAD_GATEWAY);
            }
        }
    }
    async failed(userId, mediaId, message) {
        const repo = this.repo.getRepository(Resource);
        const resource = await repo.findOne({
            where: {
                id: mediaId,
                userId,
            },
        });
        if (!resource)
            throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
        resource.status = 'FAILED';
        resource.error = message;
        return repo.save(resource);
    }
    async usage() {
        return this.cloudinary.getUsage();
    }
    async folders() {
        return this.cloudinary.getRootFolders();
    }
    async subFolders(folder) {
        return this.cloudinary.getSubFolders(folder);
    }
    async files(folder, nextCursor) {
        return this.cloudinary.getFiles(folder, nextCursor);
    }
    async removeCloudinary(publicId) {
        if (!publicId)
            throw new HttpException('publicId is required', HttpStatus.BAD_REQUEST);
        const result = await this.cloudinary.destroy(publicId);
        return { success: true, publicId, result, };
    }
    findAll(query) {
        return this.repo.findWithPagination(Resource, query);
    }
    async remove(id) {
        const repo = this.repo.getRepository(Resource);
        const media = await repo.findOne({ where: { id } });
        if (!media)
            throw new HttpException('Media not found', HttpStatus.NOT_FOUND);
        if (media.publicId)
            await this.cloudinary.destroy(media.publicId);
        await repo.remove(media);
        return { success: true, id: media.id };
    }
};
ResourcesService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [RepoService, CloudinaryService])
], ResourcesService);
export { ResourcesService };
//# sourceMappingURL=resources.service.js.map