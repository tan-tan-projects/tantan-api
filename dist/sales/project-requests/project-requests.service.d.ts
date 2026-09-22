import { ProjectRequest } from './entities/project-request.entity.js';
import { CreateProjectRequestDTO } from './dto/create-project-request.dto.js';
import { RepoService } from '../../shares/repo/repo.service.js';
export declare class ProjectRequestsService {
    private readonly repo;
    constructor(repo: RepoService);
    create(data: CreateProjectRequestDTO): Promise<ProjectRequest | ProjectRequest[]>;
}
