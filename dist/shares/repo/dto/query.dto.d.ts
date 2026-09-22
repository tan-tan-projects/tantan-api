import { PaginationDTO } from './pagination.dto.js';
export declare class QueryDTO {
    type?: string;
    search?: string;
    filter?: Record<string, any>;
    select?: string[];
    searchFields?: string[];
    additional?: Record<string, any>;
    pagination?: PaginationDTO;
}
