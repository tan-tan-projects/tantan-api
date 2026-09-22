import { ProjectRequestsService } from './project-requests.service.js';
import { CreateDTO } from './dto/project-request.dto.js';
import { QueryDTO } from '../../shares/repo/dto/query.dto.js';
export declare class ProjectRequestsController {
    readonly service: ProjectRequestsService;
    constructor(service: ProjectRequestsService);
    create(body: CreateDTO): Promise<import("./entities/project-request.entity.js").ProjectRequest | import("./entities/project-request.entity.js").ProjectRequest[]>;
    findAll(query: QueryDTO): Promise<[import("./entities/project-request.entity.js").ProjectRequest[], number]>;
}
