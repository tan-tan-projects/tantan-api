import { MonitoringDTO } from './dto/monitoring.dto.js';
import { RepoService } from '../../shares/repo/repo.service.js';
import { Monitoring } from './entities/monitoring.entity.js';
import { LoggerService } from '../logger/logger.service.js';
export declare class MonitoringService {
    readonly repo: RepoService;
    private readonly LOGGER;
    constructor(repo: RepoService, logger: LoggerService);
    create(dto: MonitoringDTO): Promise<MonitoringDTO | MonitoringDTO[]> | null;
    findRecent(): Promise<Monitoring[]>;
    countViolations(params: {
        ip: string;
        error: string;
    }): Promise<number>;
}
