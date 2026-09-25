import { MonitoringService } from './monitoring.service.js';
import { QueryDTO } from '../../shares/repo/dto/query.dto.js';
import { IpGeolocationDTO } from './dto/ip-geolocation.dto.js';
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
    createIpGeo(dto: IpGeolocationDTO): Promise<import("./entities/ip-geolocation.entity.js").IpGeolocation | import("./entities/ip-geolocation.entity.js").IpGeolocation[]>;
    ipGeoFindall(query: QueryDTO): Promise<[import("./entities/ip-geolocation.entity.js").IpGeolocation[], number]>;
    ipGeoFindOne(id: string): Promise<import("./entities/ip-geolocation.entity.js").IpGeolocation | null>;
    optionsIp(): Promise<any[]>;
}
