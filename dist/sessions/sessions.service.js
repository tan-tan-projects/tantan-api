var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var SessionsService_1;
import { Injectable } from '@nestjs/common';
import { RepoService } from '../shares/repo/repo.service.js';
import { Session } from './entities/session.entity.js';
import { LoggerService } from '../core/logger/logger.service.js';
let SessionsService = SessionsService_1 = class SessionsService {
    repo;
    LOGGER;
    constructor(repo, logger) {
        this.repo = repo;
        this.LOGGER = logger.create(SessionsService_1.name);
    }
    findAll(query) {
        return this.repo.findWithPagination(Session, query, {
            select: {
                id: true,
                user: { email: true },
                expires_at: true,
                revoked_at: true,
                created_at: true
            },
            relations: { user: true }
        });
    }
    async update(id, dto) {
        try {
            await this.repo.update(Session, { id }, dto);
            return { success: true, message: `Update session has been successfuly` };
        }
        catch (error) {
            this.LOGGER.error(error instanceof Error ? error.stack : error);
            throw error;
        }
    }
};
SessionsService = SessionsService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [RepoService, LoggerService])
], SessionsService);
export { SessionsService };
//# sourceMappingURL=sessions.service.js.map