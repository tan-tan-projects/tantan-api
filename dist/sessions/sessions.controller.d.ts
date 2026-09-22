import { SessionsService } from './sessions.service.js';
import { SessionDTO } from './dto/session.dto.js';
import { QueryDTO } from '../shares/repo/dto/query.dto.js';
export declare class SessionsController {
    private readonly service;
    constructor(service: SessionsService);
    findAll(query: QueryDTO): Promise<[import("./entities/session.entity.js").Session[], number]>;
    update(id: string, dto: SessionDTO): Promise<{
        success: boolean;
        message: string;
    }>;
}
