import { Portfolio } from "../entities/portfolio.entity.js";
export declare class PortfolioDTO {
    id?: Portfolio['id'];
    title: Portfolio['title'];
    description: Portfolio['description'];
    url: Portfolio['url'];
    is_active: Portfolio['is_active'];
}
