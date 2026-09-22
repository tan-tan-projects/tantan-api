import { MonitoringService } from './monitoring.service.js';
export declare class MonitoringController {
    private readonly service;
    constructor(service: MonitoringService);
    findAll(): import("rxjs").Observable<{
        data: {
            memory: {
                rss: number;
                heapUsed: number;
                heapTotal: number;
                external: number;
                arrayBuffers: number;
            };
            cpu: {
                user: number;
                system: number;
                loadavg: number[];
            };
            system: {
                platform: NodeJS.Platform;
                arch: NodeJS.Architecture;
                uptime: number;
                totalmem: number;
                freemem: number;
            };
            recent: import("./entities/monitoring.entity.js").Monitoring[];
        };
    }>;
}
