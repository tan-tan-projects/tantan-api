import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { RepoService } from '../shares/repo/repo.service.js';
import { JwtPayload } from '../core/jwt/guard/payload.js';
import { User } from '../users/entities/user.entity.js';
import { LoggerService } from '../core/logger/logger.service.js';
export type GoogleTokenResponse = {
    access_token?: string;
    expires_in?: number;
    scope?: string;
    token_type?: string;
    id_token?: string;
};
export declare class AuthService {
    readonly config: ConfigService;
    readonly repo: RepoService;
    readonly jwtService: JwtService;
    private utils;
    private LOGGER;
    constructor(config: ConfigService, repo: RepoService, jwtService: JwtService, logger: LoggerService);
    login(state: string): string;
    getCookie(req: Request, name: string, redirect?: boolean): string | undefined;
    private getUser;
    private generateToken;
    callback(req: Request): Promise<{
        access_token: string;
        user: JwtPayload;
    }>;
    googleMobileLogin(idToken: string): Promise<{
        access_token: string;
        user: JwtPayload;
    }>;
    me(user: JwtPayload): Promise<{
        success: boolean;
        result: User;
    }>;
    logout(user: JwtPayload): Promise<boolean>;
}
