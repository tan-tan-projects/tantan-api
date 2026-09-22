var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'node:stream';
let CloudinaryService = class CloudinaryService {
    constructor(config) {
        const { name, key, secret } = config.getOrThrow('cloudinary');
        cloudinary.config({ cloud_name: name, api_key: key, api_secret: secret });
    }
    getClient() {
        return cloudinary;
    }
    createSignature(folder, resourceType) {
        const timestamp = Math.floor(Date.now() / 1000);
        const upload_preset = 'tantan-preset';
        const paramsToSign = {
            timestamp,
            upload_preset,
            folder,
        };
        const signature = cloudinary.utils.api_sign_request(paramsToSign, cloudinary.config().api_secret);
        return {
            timestamp,
            signature,
            api_key: cloudinary.config().api_key,
            cloud_name: cloudinary.config().cloud_name,
            upload_preset,
            folder,
            resourceType
        };
    }
    async getResource(publicId) {
        return cloudinary.api.resource(publicId, { resource_type: 'image' });
    }
    async getUsage() {
        return cloudinary.api.usage();
    }
    async getRootFolders() {
        return cloudinary.api.root_folders();
    }
    async getSubFolders(folder) {
        return cloudinary.api.sub_folders(folder);
    }
    async getFiles(folder, nextCursor) {
        return cloudinary.api.resources({
            resource_type: 'image',
            type: 'upload',
            prefix: folder || undefined,
            max_results: 100,
            next_cursor: nextCursor || undefined
        });
    }
    async destroy(publicId) {
        return cloudinary.uploader.destroy(publicId, {
            resource_type: 'image',
            type: 'upload',
            invalidate: true,
        });
    }
    async uploadImage(file) {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream({
                resource_type: 'image',
            }, (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                if (!result) {
                    reject(new Error('Cloudinary upload returned no result'));
                    return;
                }
                resolve(result);
            });
            Readable.from(file.buffer).pipe(uploadStream);
        });
    }
    async destroyImage(imageUrl) {
        const publicId = this.getPublicIdFromUrl(imageUrl);
        if (!publicId) {
            throw new Error(`Unable to extract Cloudinary public_id from URL: ${imageUrl}`);
        }
        await cloudinary.uploader.destroy(publicId, {
            resource_type: 'image',
            invalidate: true,
        });
    }
    getPublicIdFromUrl(imageUrl) {
        try {
            const url = new URL(imageUrl);
            const parts = url.pathname.split('/');
            const uploadIndex = parts.indexOf('upload');
            if (uploadIndex === -1)
                return null;
            let publicIdParts = parts.slice(uploadIndex + 1);
            if (publicIdParts[0] && /^v\d+$/.test(publicIdParts[0])) {
                publicIdParts = publicIdParts.slice(1);
            }
            if (publicIdParts.length === 0)
                return null;
            const publicId = publicIdParts.join('/');
            return publicId.replace(/\.[^/.]+$/, '');
        }
        catch {
            return null;
        }
    }
};
CloudinaryService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigService])
], CloudinaryService);
export { CloudinaryService };
//# sourceMappingURL=cloudinary.service.js.map