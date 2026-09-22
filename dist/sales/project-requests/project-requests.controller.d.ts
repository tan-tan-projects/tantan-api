import { ProjectRequestsService } from './project-requests.service.js';
import { CreateProjectRequestDTO } from './dto/create-project-request.dto.js';
export declare class ProjectRequestsController {
    private readonly service;
    constructor(service: ProjectRequestsService);
    create(body: CreateProjectRequestDTO): Promise<{
        data: import("./entities/project-request.entity.js").ProjectRequest | import("./entities/project-request.entity.js").ProjectRequest[];
    }>;
}
