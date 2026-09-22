import { PortfolioDTO } from './dto/portfolio.dto.js';
import { RepoService } from '../shares/repo/repo.service.js';
import { QueryDTO } from '../shares/repo/dto/query.dto.js';
import { Portfolio } from './entities/portfolio.entity.js';
import { LoggerService } from '../core/logger/logger.service.js';
import { CloudinaryService } from '../shares/cloudinary/cloudinary.service.js';
export declare class PortfoliosService {
    readonly repo: RepoService;
    readonly cloudinary: CloudinaryService;
    private LOGGER;
    constructor(repo: RepoService, logger: LoggerService, cloudinary: CloudinaryService);
    create(dto: PortfolioDTO | PortfolioDTO[]): Promise<{
        success: boolean;
        message: string;
    }>;
    findAll(query: QueryDTO): Promise<[Portfolio[], number]>;
    findOne(id: string): Promise<Portfolio | null>;
    update(id: string, dto: PortfolioDTO | PortfolioDTO[]): Promise<{
        success: boolean;
        message: string;
    }>;
    remove(id: string): Promise<Portfolio | Portfolio[]>;
}
