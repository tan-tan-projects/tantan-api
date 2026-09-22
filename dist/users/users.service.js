var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var UsersService_1;
import { Injectable } from '@nestjs/common';
import { RepoService } from '../shares/repo/repo.service.js';
import { User } from './entities/user.entity.js';
import { LoggerService } from '../core/logger/logger.service.js';
let UsersService = UsersService_1 = class UsersService {
    repo;
    LOGGER;
    constructor(repo, logger) {
        this.repo = repo;
        this.LOGGER = logger.create(UsersService_1.name);
    }
    async create(dto) {
        try {
            await this.repo.save(User, dto);
            return { success: true, message: `Save user ${dto.email} has been successfuly` };
        }
        catch (error) {
            this.LOGGER.error(error instanceof Error ? error.stack : error);
            throw error;
        }
    }
    findAll(query) {
        return this.repo.findWithPagination(User, query);
    }
    findOne(id) {
        return this.repo.findOne(User, { where: { id } });
    }
    async update(id, dto) {
        try {
            await this.repo.update(User, { id }, dto);
            return { success: true, message: `Update user ${dto.email} has been successfuly` };
        }
        catch (error) {
            this.LOGGER.error(error instanceof Error ? error.stack : error);
            throw error;
        }
    }
    remove(id) {
        return this.repo.delete(User, { id });
    }
};
UsersService = UsersService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [RepoService, LoggerService])
], UsersService);
export { UsersService };
//# sourceMappingURL=users.service.js.map