var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ResourcesService } from './resources.service.js';
import { CUser } from '../core/jwt/decorator/user.js';
import { QueryDTO } from '../shares/repo/dto/query.dto.js';
let ResourcesController = class ResourcesController {
    service;
    constructor(service) {
        this.service = service;
    }
    signature(user, dto) {
        return this.service.signature(user, dto?.folder);
    }
    async complete(user, body) {
        return this.service.complete(user.id, body.mediaId, body.publicId);
    }
    async failed(user, body) {
        return this.service.failed(user.id, body.mediaId, body.message);
    }
    usage() {
        return this.service.usage();
    }
    folders() {
        return this.service.folders();
    }
    subFolders(folder) {
        return this.service.subFolders(folder);
    }
    files(folder, nextCursor) {
        return this.service.files(folder, nextCursor);
    }
    findAll(query) {
        return this.service.findAll(query);
    }
    removeCloudinary(publicId) {
        return this.service.removeCloudinary(publicId);
    }
    remove(id) {
        return this.service.remove(id);
    }
};
__decorate([
    Post('signature'),
    __param(0, CUser()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ResourcesController.prototype, "signature", null);
__decorate([
    Post('complete'),
    __param(0, CUser()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ResourcesController.prototype, "complete", null);
__decorate([
    Post('failed'),
    __param(0, CUser()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ResourcesController.prototype, "failed", null);
__decorate([
    Get('usage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ResourcesController.prototype, "usage", null);
__decorate([
    Get('folders'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ResourcesController.prototype, "folders", null);
__decorate([
    Get('folders/sub'),
    __param(0, Query('folder')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ResourcesController.prototype, "subFolders", null);
__decorate([
    Get('files'),
    __param(0, Query('folder')),
    __param(1, Query('next_cursor')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ResourcesController.prototype, "files", null);
__decorate([
    Get(),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [QueryDTO]),
    __metadata("design:returntype", void 0)
], ResourcesController.prototype, "findAll", null);
__decorate([
    Delete('cloudinary'),
    __param(0, Query('publicId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ResourcesController.prototype, "removeCloudinary", null);
__decorate([
    Delete(':id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ResourcesController.prototype, "remove", null);
ResourcesController = __decorate([
    Controller('resources'),
    __metadata("design:paramtypes", [ResourcesService])
], ResourcesController);
export { ResourcesController };
//# sourceMappingURL=resources.controller.js.map