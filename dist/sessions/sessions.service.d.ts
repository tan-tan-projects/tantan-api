import { SessionDTO } from './dto/session.dto.js';
import { QueryDTO } from '../shares/repo/dto/query.dto.js';
import { RepoService } from '../shares/repo/repo.service.js';
import { Session } from './entities/session.entity.js';
import { LoggerService } from '../core/logger/logger.service.js';
export declare class SessionsService {
    readonly repo: RepoService;
    private LOGGER;
    constructor(repo: RepoService, logger: LoggerService);
    findAll(query: QueryDTO): Promise<[Session[], number]>;
    update(id: string, dto: SessionDTO): Promise<{
        success: boolean;
        message: string;
    }>;
}
