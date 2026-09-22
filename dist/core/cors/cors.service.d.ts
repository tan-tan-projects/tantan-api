import { OnModuleInit } from '@nestjs/common';
import { RepoService } from '../../shares/repo/repo.service.js';
import { CorsOrigin } from './entities/cors.entity.js';
import { CorsDTO } from './dto/cors.dto.js';
import { QueryDTO } from '../../shares/repo/dto/query.dto.js';
export declare class CorsService implements OnModuleInit {
    readonly repo: RepoService;
    private origins;
    constructor(repo: RepoService);
    onModuleInit(): Promise<void>;
    load(): Promise<void>;
    isAllowed(origin: string): boolean;
    getOrigins(): string[];
    refresh(): Promise<void>;
    create(dto: CorsDTO): Promise<CorsDTO | CorsDTO[]>;
    findOne(id: string): Promise<CorsOrigin | null>;
    findAll(query: QueryDTO): Promise<[CorsOrigin[], number]>;
    update(id: string, dto: CorsDTO): Promise<CorsDTO | CorsDTO[]>;
}
