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
import { Controller, Get, Body, Patch, Param, Query } from '@nestjs/common';
import { SessionsService } from './sessions.service.js';
import { SessionDTO } from './dto/session.dto.js';
import { QueryDTO } from '../shares/repo/dto/query.dto.js';
let SessionsController = class SessionsController {
    service;
    constructor(service) {
        this.service = service;
    }
    findAll(query) {
        return this.service.findAll(query);
    }
    update(id, dto) {
        return this.service.update(id, dto);
    }
};
__decorate([
    Get(),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [QueryDTO]),
    __metadata("design:returntype", void 0)
], SessionsController.prototype, "findAll", null);
__decorate([
    Patch(':id'),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, SessionDTO]),
    __metadata("design:returntype", void 0)
], SessionsController.prototype, "update", null);
SessionsController = __decorate([
    Controller('sessions'),
    __metadata("design:paramtypes", [SessionsService])
], SessionsController);
export { SessionsController };
//# sourceMappingURL=sessions.controller.js.map