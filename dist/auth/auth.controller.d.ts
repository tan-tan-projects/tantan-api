import { AuthService } from './auth.service.js';
import type { Request, Response } from 'express';
import type { JwtPayload } from '../core/jwt/guard/payload.js';
export declare class AuthController {
    readonly service: AuthService;
    constructor(service: AuthService);
    login(req: Request, res: Response): void | {
        success: boolean;
        message: string;
    };
    callback(req: Request, res: Response): Promise<void | {
        success: boolean;
        message: string;
    }>;
    googleMobile(idToken: string, res: Response): Promise<{
        success: boolean;
        message: string;
        code?: undefined;
    } | {
        success: boolean;
        code: string | undefined;
        message?: undefined;
    }>;
    exchange(code: string, res: Response): Promise<{
        success: boolean;
        message: string;
        code?: undefined;
    } | {
        success: boolean;
        code: string;
        message?: undefined;
    }>;
    me(user: JwtPayload): Promise<{
        success: boolean;
        result: import("../users/entities/user.entity.js").User;
    }>;
    logout(user: JwtPayload, res: Response): Promise<{
        success: boolean;
        message: string;
    }>;
}
