var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@nestjs/common";
import { RepoService } from "../repo/repo.service.js";
import { Portfolio } from "../../portfolios/entities/portfolio.entity.js";
let ToolsAIService = class ToolsAIService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async searchPortfolios(query) {
        const portfolios = await this.repo.find(Portfolio, {
            where: { is_active: true },
            order: { created_at: 'DESC' },
        });
        const normalizedQuery = query.trim().toLowerCase();
        if (!normalizedQuery) {
            return portfolios.map((portfolio) => ({
                id: portfolio.id,
                title: portfolio.title,
                description: portfolio.description,
                image: portfolio.image,
                url: portfolio.url,
            }));
        }
        const allPortfolioPattern = /\b(all|list|show|display)\b.*\b(projects?|portfolio)\b|\b(projects?|portfolio)\b.*\b(all|list|show|display)\b/;
        if (allPortfolioPattern.test(normalizedQuery)) {
            return portfolios.map((portfolio) => ({
                id: portfolio.id,
                title: portfolio.title,
                description: portfolio.description,
                image: portfolio.image,
                url: portfolio.url,
            }));
        }
        const keywords = normalizedQuery.split(/\s+/).filter(Boolean);
        const results = portfolios.filter((portfolio) => {
            const searchableText = [portfolio.title, portfolio.description,]
                .filter(Boolean)
                .join(' ')
                .toLowerCase();
            return keywords.every((keyword) => searchableText.includes(keyword));
        });
        return results.map((portfolio) => ({
            id: portfolio.id,
            title: portfolio.title,
            description: portfolio.description,
            image: portfolio.image,
            url: portfolio.url,
        }));
    }
    async execute(name, arguments_) {
        switch (name) {
            case 'search_portfolios':
                {
                    const query = arguments_.query;
                    if (typeof query !== 'string')
                        throw new Error('search_portfolios requires a string query');
                    return await this.searchPortfolios(query);
                }
            default: throw new Error(`Unknown AI Sales function: ${name}`);
        }
    }
};
ToolsAIService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [RepoService])
], ToolsAIService);
export { ToolsAIService };
//# sourceMappingURL=tools.service.js.map