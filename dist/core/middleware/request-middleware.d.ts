import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggerService } from '../logger/logger.service.js';
import { CorsService } from '../cors/cors.service.js';
import { MonitoringService } from '../monitoring/monitoring.service.js';
import { SecurityRuleService } from '../security/security.service.js';
export declare class RequestMiddleware implements NestMiddleware {
    readonly corsOrigin: CorsService;
    readonly monitoring: MonitoringService;
    readonly security: SecurityRuleService;
    private LOGGER;
    constructor(logger: LoggerService, corsOrigin: CorsService, monitoring: MonitoringService, security: SecurityRuleService);
    private createCORS;
    private createHelmet;
    private handleViolation;
    private handleRequest;
    use(req: Request, res: Response, next: NextFunction): void;
}
