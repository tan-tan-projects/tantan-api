var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MonitoringService_1;
import { Injectable } from '@nestjs/common';
import { RepoService } from '../../shares/repo/repo.service.js';
import { Monitoring } from './entities/monitoring.entity.js';
import { LoggerService } from '../logger/logger.service.js';
let MonitoringService = MonitoringService_1 = class MonitoringService {
    repo;
    LOGGER;
    constructor(repo, logger) {
        this.repo = repo;
        this.LOGGER = logger.create(MonitoringService_1.name);
    }
    create(dto) {
        try {
            return this.repo.save(Monitoring, dto);
        }
        catch (error) {
            this.LOGGER.error(error instanceof Error ? error.message : String(error));
            return null;
        }
    }
    async findRecent() {
        return await this.repo.find(Monitoring, { order: { created_at: 'DESC' }, take: 10 });
    }
    async countViolations(params) {
        return this.repo.getRepository(Monitoring).countBy({ ip: params.ip, error: params.error });
    }
};
MonitoringService = MonitoringService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [RepoService, LoggerService])
], MonitoringService);
export { MonitoringService };
//# sourceMappingURL=monitoring.service.js.map