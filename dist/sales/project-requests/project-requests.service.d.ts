import { ProjectRequest } from './entities/project-request.entity.js';
import { CreateDTO } from './dto/project-request.dto.js';
import { RepoService } from '../../shares/repo/repo.service.js';
import { QueryDTO } from '../../shares/repo/dto/query.dto.js';
export declare class ProjectRequestsService {
    readonly repo: RepoService;
    constructor(repo: RepoService);
    create(data: CreateDTO): Promise<ProjectRequest | ProjectRequest[]>;
    findAll(query: QueryDTO): Promise<[ProjectRequest[], number]>;
}
