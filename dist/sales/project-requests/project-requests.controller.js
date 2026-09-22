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
import { ProjectRequestsService } from './project-requests.service.js';
import { CreateDTO } from './dto/project-request.dto.js';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Public } from '../../core/jwt/guard/auth.js';
import { QueryDTO } from '../../shares/repo/dto/query.dto.js';
let ProjectRequestsController = class ProjectRequestsController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(body) {
        return this.service.create(body);
    }
    findAll(query) {
        return this.service.findAll(query);
    }
};
__decorate([
    Public(),
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateDTO]),
    __metadata("design:returntype", void 0)
], ProjectRequestsController.prototype, "create", null);
__decorate([
    Get(),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [QueryDTO]),
    __metadata("design:returntype", void 0)
], ProjectRequestsController.prototype, "findAll", null);
ProjectRequestsController = __decorate([
    Controller('project-requests'),
    __metadata("design:paramtypes", [ProjectRequestsService])
], ProjectRequestsController);
export { ProjectRequestsController };
//# sourceMappingURL=project-requests.controller.js.map