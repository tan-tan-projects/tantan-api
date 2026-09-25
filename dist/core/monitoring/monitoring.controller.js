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
import { Body, Controller, Get, Param, Post, Query, Sse } from '@nestjs/common';
import { MonitoringService } from './monitoring.service.js';
import { interval, mergeMap } from 'rxjs';
import * as os from "os";
import { QueryDTO } from '../../shares/repo/dto/query.dto.js';
import { IpGeolocationDTO } from './dto/ip-geolocation.dto.js';
let MonitoringController = class MonitoringController {
    service;
    constructor(service) {
        this.service = service;
    }
    findAll() {
        return interval(3000).pipe(mergeMap(async () => {
            const mem = process.memoryUsage();
            const cpu = process.cpuUsage();
            const uptime = process.uptime();
            return {
                data: {
                    memory: {
                        rss: mem.rss,
                        heapUsed: mem.heapUsed,
                        heapTotal: mem.heapTotal,
                        external: mem.external,
                        arrayBuffers: mem.arrayBuffers,
                    },
                    cpu: {
                        user: cpu.user,
                        system: cpu.system,
                        loadavg: os.loadavg(),
                    },
                    system: {
                        platform: os.platform(),
                        arch: os.arch(),
                        uptime: Math.round(uptime),
                        totalmem: os.totalmem(),
                        freemem: os.freemem(),
                    },
                    recent: await this.service.findRecent(),
                }
            };
        }));
    }
    createIpGeo(dto) {
        return this.service.createIpGeo(dto);
    }
    ipGeoFindall(query) {
        return this.service.ipGeoFindall(query);
    }
    ipGeoFindOne(id) {
        return this.service.ipGeoFindOne(+id);
    }
    optionsIp() {
        return this.service.optionsIp();
    }
};
__decorate([
    Sse(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MonitoringController.prototype, "findAll", null);
__decorate([
    Post('ip-geolocation'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [IpGeolocationDTO]),
    __metadata("design:returntype", void 0)
], MonitoringController.prototype, "createIpGeo", null);
__decorate([
    Get('ip-geolocation'),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [QueryDTO]),
    __metadata("design:returntype", void 0)
], MonitoringController.prototype, "ipGeoFindall", null);
__decorate([
    Get('ip-geolocation/:id'),
    __param(0, Param("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MonitoringController.prototype, "ipGeoFindOne", null);
__decorate([
    Get('ip-geolocation/get/options'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MonitoringController.prototype, "optionsIp", null);
MonitoringController = __decorate([
    Controller('monitoring'),
    __metadata("design:paramtypes", [MonitoringService])
], MonitoringController);
export { MonitoringController };
//# sourceMappingURL=monitoring.controller.js.map