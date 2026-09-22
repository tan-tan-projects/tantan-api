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
import { RepoService } from '../../shares/repo/repo.service.js';
import { CorsOrigin } from './entities/cors.entity.js';
let CorsService = class CorsService {
    repo;
    origins = new Set();
    constructor(repo) {
        this.repo = repo;
    }
    async onModuleInit() {
        await this.load();
    }
    async load() {
        const rows = await this.repo.find(CorsOrigin, { where: { is_active: true } });
        this.origins = new Set(rows.map(row => row.origin.trim()).filter(Boolean));
    }
    isAllowed(origin) {
        return this.origins.has(origin);
    }
    getOrigins() {
        return [...this.origins];
    }
    async refresh() {
        await this.load();
    }
    create(dto) {
        return this.repo.save(CorsOrigin, dto);
    }
    findOne(id) {
        return this.repo.findOne(CorsOrigin, { where: { id } });
    }
    findAll(query) {
        return this.repo.findWithPagination(CorsOrigin, query);
    }
    update(id, dto) {
        return this.repo.update(CorsOrigin, { id }, dto);
    }
};
CorsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [RepoService])
], CorsService);
export { CorsService };
//# sourceMappingURL=cors.service.js.map