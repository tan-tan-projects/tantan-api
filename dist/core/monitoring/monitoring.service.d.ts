import { MonitoringDTO } from './dto/monitoring.dto.js';
import { RepoService } from '../../shares/repo/repo.service.js';
import { Monitoring } from './entities/monitoring.entity.js';
import { LoggerService } from '../logger/logger.service.js';
import { IpGeolocation } from './entities/ip-geolocation.entity.js';
export declare class MonitoringService {
    readonly repo: RepoService;
    private readonly LOGGER;
    constructor(repo: RepoService, logger: LoggerService);
    create(dto: MonitoringDTO): Promise<Monitoring | Monitoring[] | undefined>;
    getIpGeolocation(ip: string): Promise<IpGeolocation | undefined>;
    findRecent(): Promise<Monitoring[]>;
    countViolations(params: {
        ip: string;
        error: string;
    }): Promise<number>;
}
