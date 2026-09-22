import { PortfoliosService } from './portfolios.service.js';
import { PortfolioDTO } from './dto/portfolio.dto.js';
import { QueryDTO } from '../shares/repo/dto/query.dto.js';
export declare class PortfoliosController {
    private readonly service;
    constructor(service: PortfoliosService);
    create(dto: PortfolioDTO | PortfolioDTO[]): Promise<{
        success: boolean;
        message: string;
    }>;
    findAll(query: QueryDTO): Promise<[import("./entities/portfolio.entity.js").Portfolio[], number]>;
    findOne(id: string): Promise<import("./entities/portfolio.entity.js").Portfolio | null>;
    update(id: string, dto: PortfolioDTO | PortfolioDTO[]): Promise<{
        success: boolean;
        message: string;
    }>;
    remove(id: string): Promise<import("./entities/portfolio.entity.js").Portfolio | import("./entities/portfolio.entity.js").Portfolio[]>;
}
