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
import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CorsService } from './cors.service.js';
import { CorsDTO } from './dto/cors.dto.js';
import { QueryDTO } from '../../shares/repo/dto/query.dto.js';
let CorsController = class CorsController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(dto) {
        return this.service.create(dto);
    }
    findOne(id) {
        return this.service.findOne(id);
    }
    findAll(query) {
        return this.service.findAll(query);
    }
    update(id, dto) {
        return this.service.update(id, dto);
    }
};
__decorate([
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CorsDTO]),
    __metadata("design:returntype", void 0)
], CorsController.prototype, "create", null);
__decorate([
    Get(':id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CorsController.prototype, "findOne", null);
__decorate([
    Get(),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [QueryDTO]),
    __metadata("design:returntype", void 0)
], CorsController.prototype, "findAll", null);
__decorate([
    Patch(':id'),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, CorsDTO]),
    __metadata("design:returntype", void 0)
], CorsController.prototype, "update", null);
CorsController = __decorate([
    Controller('cors'),
    __metadata("design:paramtypes", [CorsService])
], CorsController);
export { CorsController };
//# sourceMappingURL=cors.controller.js.map