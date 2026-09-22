import { UsersService } from './users.service.js';
import { UserDTO } from './dto/user.dto.js';
import { QueryDTO } from '../shares/repo/dto/query.dto.js';
export declare class UsersController {
    private readonly service;
    constructor(service: UsersService);
    create(dto: UserDTO): Promise<{
        success: boolean;
        message: string;
    }>;
    findAll(query: QueryDTO): Promise<[import("./entities/user.entity.js").User[], number]>;
    findOne(id: string): Promise<import("./entities/user.entity.js").User | null>;
    update(id: string, dto: UserDTO): Promise<{
        success: boolean;
        message: string;
    }>;
    remove(id: string): Promise<import("./entities/user.entity.js").User | import("./entities/user.entity.js").User[]>;
}
