import { UserRole } from './role.enum.js';
export declare const ROLES_KEY = "role";
export declare const Roles: (...roles: UserRole[]) => import("@nestjs/common").CustomDecorator<string>;
