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
import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { AiService } from './ai.service.js';
import { Public } from '../../core/jwt/guard/auth.js';
import { SendMessageDTO } from './dto/send-message.dto.js';
let AiController = class AiController {
    service;
    constructor(service) {
        this.service = service;
    }
    create() {
        return this.service.create();
    }
    findOne(id) {
        return this.service.findOne(id);
    }
    addMessage(conversation_id, dto) {
        return this.service.sendMessage(conversation_id, dto.content);
    }
    getMessages(conversation_id) {
        return this.service.getMessages(conversation_id);
    }
};
__decorate([
    Public(),
    Post('conversations'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AiController.prototype, "create", null);
__decorate([
    Public(),
    Get('conversations/:id'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AiController.prototype, "findOne", null);
__decorate([
    Public(),
    Post('conversations/:id/messages'),
    __param(0, Param('id')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, SendMessageDTO]),
    __metadata("design:returntype", void 0)
], AiController.prototype, "addMessage", null);
__decorate([
    Public(),
    Get('conversations/:id/messages'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AiController.prototype, "getMessages", null);
AiController = __decorate([
    Controller('ai'),
    __metadata("design:paramtypes", [AiService])
], AiController);
export { AiController };
//# sourceMappingURL=ai.controller.js.map