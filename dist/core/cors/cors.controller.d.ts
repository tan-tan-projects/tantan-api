import { CorsService } from './cors.service.js';
import { CorsDTO } from './dto/cors.dto.js';
import { QueryDTO } from '../../shares/repo/dto/query.dto.js';
export declare class CorsController {
    readonly service: CorsService;
    constructor(service: CorsService);
    create(dto: CorsDTO): Promise<CorsDTO | CorsDTO[]>;
    findOne(id: string): Promise<import("./entities/cors.entity.js").CorsOrigin | null>;
    findAll(query: QueryDTO): Promise<[import("./entities/cors.entity.js").CorsOrigin[], number]>;
    update(id: string, dto: CorsDTO): Promise<CorsDTO | CorsDTO[]>;
}
