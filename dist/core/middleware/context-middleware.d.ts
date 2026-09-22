import { AsyncLocalStorage } from 'async_hooks';
import { NextFunction, Request, Response } from 'express';
import type { JwtPayload } from '../jwt/guard/payload.js';
export type RequestDeviceType = 'desktop' | 'mobile' | 'tablet' | 'smarttv' | 'wearable' | 'embedded' | 'console' | 'unknown';
export interface IRequestDevice {
    type: RequestDeviceType;
    os: string;
    osVersion: string;
    browser: string;
    browserVersion: string;
    model: string;
    vendor: string;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
}
export interface IRequestBot {
    isBot: boolean;
    name: string;
    category: string;
}
export interface IRequestInfo {
    method: string;
    url: string;
    path: string;
    ip: string;
    ips: string[];
    protocol: string;
    secure: boolean;
    host: string;
    origin: string;
    referer: string;
    userAgent: string;
    language: string;
    contentType: string;
    contentLength: string;
}
export interface IRequestContext {
    id: string;
    req: Request;
    res: Response;
    request: IRequestInfo;
    device: IRequestDevice;
    bot: IRequestBot;
    user: JwtPayload;
}
export declare const requestContextStorage: AsyncLocalStorage<IRequestContext>;
export declare class ContextMiddleware {
    static run(req: Request, res: Response, next: NextFunction): void;
    static current(): IRequestContext | undefined;
    static get(): IRequestContext | undefined;
    static id(): string;
    static request(): IRequestInfo | undefined;
    static device(): IRequestDevice | undefined;
    static bot(): IRequestBot | undefined;
    static user(): any;
    private static resolveDeviceType;
    private static detectBot;
    private static detectBotName;
    private static detectBotCategory;
}
