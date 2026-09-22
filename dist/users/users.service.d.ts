import { ConsoleLogger } from '@nestjs/common';
import { UserDTO } from './dto/user.dto.js';
import { RepoService } from '../shares/repo/repo.service.js';
import { User } from './entities/user.entity.js';
import { LoggerService } from '../core/logger/logger.service.js';
import { QueryDTO } from '../shares/repo/dto/query.dto.js';
export declare class UsersService {
    readonly repo: RepoService;
    readonly LOGGER: ConsoleLogger;
    constructor(repo: RepoService, logger: LoggerService);
    create(dto: UserDTO): Promise<{
        success: boolean;
        message: string;
    }>;
    findAll(query: QueryDTO): Promise<[User[], number]>;
    findOne(id: string): Promise<User | null>;
    update(id: string, dto: UserDTO): Promise<{
        success: boolean;
        message: string;
    }>;
    remove(id: string): Promise<User | User[]>;
}
