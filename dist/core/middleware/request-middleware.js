var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ContextMiddleware } from './context-middleware.js';
import { LoggerService } from '../logger/logger.service.js';
import cors from "cors";
import helmet from "helmet";
import { CorsService } from '../cors/cors.service.js';
import { MonitoringService } from '../monitoring/monitoring.service.js';
import { SecurityRuleService } from '../security/security.service.js';
import { SecurityRuleType } from '../security/entity/security-rule.entity.js';
let RequestMiddleware = class RequestMiddleware {
    corsOrigin;
    monitoring;
    security;
    LOGGER;
    constructor(logger, corsOrigin, monitoring, security) {
        this.corsOrigin = corsOrigin;
        this.monitoring = monitoring;
        this.security = security;
        this.LOGGER = logger.create('Middleware');
    }
    createCORS() {
        return cors({
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            origin: async (origin, callback) => {
                if (!origin)
                    return callback(null, true);
                await this.corsOrigin.refresh();
                if (this.corsOrigin.isAllowed(origin))
                    return callback(null, true);
                return callback(new Error(`CORS blocked for origin: ${origin}`), false);
            }
        });
    }
    createHelmet() {
        return helmet({
            hidePoweredBy: true,
            crossOriginResourcePolicy: { policy: 'cross-origin' },
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    scriptSrc: ["'self'"],
                    connectSrc: ["'self'"],
                    imgSrc: ["'self'", "blob:", "data:", 'https://res.cloudinary.com'],
                }
            }
        });
    }
    async handleViolation(req, error, status) {
        const ip = req.ip;
        const message = error instanceof Error ? error.message : String(error);
        await this.monitoring.create({
            method: req.method,
            url: req.originalUrl,
            ip,
            status,
            error: message,
            duration: 0,
        });
        const violations = await this.monitoring.countViolations({ ip, error: message });
        if (violations > 3) {
            await this.security.blockBot(SecurityRuleType.BOT, ip, `Repeated violation: ${message}`);
            this.LOGGER.error({
                name: 'block',
                error
            });
            return true;
        }
        this.LOGGER.error(error);
        return false;
    }
    async handleRequest(req, res, next) {
        const corsMiddleware = this.createCORS();
        const helmetMiddleware = this.createHelmet();
        corsMiddleware(req, res, async (err) => {
            if (err) {
                const blocked = await this.handleViolation(req, err, HttpStatus.NOT_ACCEPTABLE);
                if (!blocked)
                    return next(new HttpException('CORS not allowed for this origin', HttpStatus.NOT_ACCEPTABLE));
                const origin = req.headers.origin;
                if (origin) {
                    res.header('Access-Control-Allow-Origin', origin);
                    res.header('Access-Control-Allow-Credentials', 'true');
                }
                res.header('Cache-Control', 'private, max-age=86400');
                return next(new HttpException('Your access has been blocked', HttpStatus.LOCKED));
            }
            helmetMiddleware(req, res, async (err) => {
                if (err) {
                    const blocked = await this.handleViolation(req, err, HttpStatus.FORBIDDEN);
                    if (blocked)
                        return next(new HttpException('Your access has been blocked', HttpStatus.LOCKED));
                    return next(new HttpException('Your request not accepted', HttpStatus.FORBIDDEN));
                }
                try {
                    ContextMiddleware.run(req, res, next);
                }
                catch (error) {
                    this.LOGGER.error('[REQUEST MIDDLEWARE ERROR]');
                    this.LOGGER.error(error instanceof Error ? error.stack : String(error));
                    this.LOGGER.error('=========================');
                    next(error);
                }
            });
        });
    }
    use(req, res, next) {
        void this.handleRequest(req, res, next);
    }
};
RequestMiddleware = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [LoggerService,
        CorsService,
        MonitoringService,
        SecurityRuleService])
], RequestMiddleware);
export { RequestMiddleware };
;
//# sourceMappingURL=request-middleware.js.map