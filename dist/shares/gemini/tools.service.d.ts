import { RepoService } from "../repo/repo.service.js";
export declare class ToolsAIService {
    private readonly repo;
    constructor(repo: RepoService);
    searchPortfolios(query: string): Promise<{
        id: string;
        title: string;
        description: string;
        image: string;
        url: string;
    }[]>;
    execute(name: string, arguments_: Record<string, unknown>): Promise<{
        id: string;
        title: string;
        description: string;
        image: string;
        url: string;
    }[]>;
}
