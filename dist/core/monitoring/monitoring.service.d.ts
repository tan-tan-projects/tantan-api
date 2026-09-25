import { MonitoringDTO } from './dto/monitoring.dto.js';
import { RepoService } from '../../shares/repo/repo.service.js';
import { Monitoring } from './entities/monitoring.entity.js';
import { LoggerService } from '../logger/logger.service.js';
import { IpGeolocation } from './entities/ip-geolocation.entity.js';
import { IpGeolocationDTO } from './dto/ip-geolocation.dto.js';
import { QueryDTO } from '../../shares/repo/dto/query.dto.js';
export declare class MonitoringService {
    readonly repo: RepoService;
    private readonly LOGGER;
    constructor(repo: RepoService, logger: LoggerService);
    create(dto: MonitoringDTO): Promise<Monitoring | Monitoring[] | undefined>;
    getIpGeolocation(ip: string): Promise<IpGeolocation | IpGeolocation[] | undefined>;
    createIpGeo(dto: IpGeolocationDTO | any): Promise<IpGeolocation | IpGeolocation[]>;
    ipGeoFindall(query: QueryDTO): Promise<[IpGeolocation[], number]>;
    ipGeoFindOne(id: number): Promise<IpGeolocation | null>;
    optionsIp(): Promise<any[]>;
    findRecent(): Promise<Monitoring[]>;
    countViolations(params: {
        ip: string;
        error: string;
    }): Promise<number>;
}
