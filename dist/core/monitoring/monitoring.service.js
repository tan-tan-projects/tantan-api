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
import { IpGeolocation } from './entities/ip-geolocation.entity.js';
let MonitoringService = MonitoringService_1 = class MonitoringService {
    repo;
    LOGGER;
    constructor(repo, logger) {
        this.repo = repo;
        this.LOGGER = logger.create(MonitoringService_1.name);
    }
    async create(dto) {
        try {
            const repo = this.repo.getRepository(Monitoring);
            const result = repo.create(dto);
            await this.getIpGeolocation(result.ip);
            return this.repo.save(Monitoring, result);
        }
        catch (error) {
            this.LOGGER.error({
                name: 'monitoring',
                message: error instanceof Error ? error.stack : error
            });
        }
    }
    async getIpGeolocation(ip) {
        const repo = this.repo.getRepository(IpGeolocation);
        const existing = await repo.findOne({ where: { ip } });
        if (existing)
            return existing;
        try {
            const response = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}`);
            if (!response.ok)
                throw new Error(`IPWhois request failed: ${response.status} ${response.statusText}`);
            const data = await response.json();
            if (!data?.success)
                throw new Error(data?.message || 'IP geolocation lookup failed');
            return await this.createIpGeo({ ip, ...data });
        }
        catch (error) {
            this.LOGGER.error({
                name: 'ip-geolocation',
                message: error instanceof Error ? error.stack : error
            });
        }
    }
    async createIpGeo(dto) {
        return await this.repo.save(IpGeolocation, {
            ip: dto.ip,
            country: dto.country,
            country_code: dto.country_code,
            region: dto.region,
            city: dto.city,
            latitude: dto.latitude,
            longitude: dto.longitude,
            isp: dto?.connection?.isp,
            organization: dto?.connection?.org,
            asn: dto?.connection?.asn,
            timezone: dto.timezone?.current_time,
        });
    }
    ipGeoFindall(query) {
        return this.repo.findWithPagination(IpGeolocation, query);
    }
    ipGeoFindOne(id) {
        return this.repo.findOne(IpGeolocation, { where: { id } });
    }
    async optionsIp() {
        const monitoringIps = await this.repo.getRepository(Monitoring)
            .createQueryBuilder('monitoring')
            .select('monitoring.ip', 'ip')
            .where('monitoring.ip IS NOT NULL')
            .distinct(true)
            .orderBy('monitoring.ip', 'ASC')
            .getRawMany();
        const geolocationIps = await this.repo.find(IpGeolocation, { select: { ip: true } });
        const existingIps = new Set(geolocationIps.map((item) => item.ip));
        return [...new Set(monitoringIps.map((item) => item.ip).filter((ip) => !existingIps.has(ip)))];
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