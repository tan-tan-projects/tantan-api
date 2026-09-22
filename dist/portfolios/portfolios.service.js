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
import { RepoService } from '../shares/repo/repo.service.js';
import { Portfolio } from './entities/portfolio.entity.js';
import { In } from 'typeorm';
import { LoggerService } from '../core/logger/logger.service.js';
import { CloudinaryService } from '../shares/cloudinary/cloudinary.service.js';
let PortfoliosService = class PortfoliosService {
    repo;
    cloudinary;
    LOGGER;
    constructor(repo, logger, cloudinary) {
        this.repo = repo;
        this.cloudinary = cloudinary;
        this.LOGGER = logger.create('Portfolios');
    }
    async create(dto) {
        try {
            await this.repo.save(Portfolio, dto);
            return { success: true, message: `Save portfolio has been successfuly` };
        }
        catch (error) {
            this.LOGGER.error(error instanceof Error ? error.stack : error);
            throw error;
        }
    }
    findAll(query) {
        return this.repo.findWithPagination(Portfolio, query);
    }
    findOne(id) {
        return this.repo.findOne(Portfolio, { where: { id } });
    }
    async update(id, dto) {
        try {
            const ids = Array.isArray(dto) ? dto.map((value) => value.id) : [id];
            await this.repo.update(Portfolio, { id: In(ids) }, dto);
            return { success: true, message: `Update portfolio has been successfuly` };
        }
        catch (error) {
            this.LOGGER.error(error instanceof Error ? error.stack : error);
            throw error;
        }
    }
    remove(id) {
        return this.repo.delete(Portfolio, { id });
    }
};
PortfoliosService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [RepoService,
        LoggerService,
        CloudinaryService])
], PortfoliosService);
export { PortfoliosService };
//# sourceMappingURL=portfolios.service.js.map