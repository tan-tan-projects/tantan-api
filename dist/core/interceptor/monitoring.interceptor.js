var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpException, Injectable } from "@nestjs/common";
import { LoggerService } from "../logger/logger.service.js";
import { catchError, finalize, throwError } from "rxjs";
import { UtilsService } from "../../shares/utils/utils.service.js";
import { MonitoringService } from "../monitoring/monitoring.service.js";
import { ContextMiddleware } from "../middleware/context-middleware.js";
let MonitoringInterceptor = class MonitoringInterceptor {
    monitoring;
    utils;
    constructor(monitoring, logger) {
        this.monitoring = monitoring;
        this.utils = new UtilsService(logger);
    }
    intercept(context, next) {
        const req = context.switchToHttp().getRequest();
        const res = context.switchToHttp().getResponse();
        const startedAt = performance.now();
        const path = req.route?.path;
        const ignored = path?.startsWith('/.well-known') || path === '/monitoring';
        if (ignored)
            return next.handle();
        const ctx = ContextMiddleware.get();
        let error = null;
        return next.handle().pipe(catchError(exception => {
            error = exception;
            this.utils.log(path, req, res, startedAt, 'error');
            return throwError(() => exception);
        }), finalize(() => {
            const duration = performance.now() - startedAt;
            void this.monitoring.create({
                method: ctx?.request.method ?? req.method,
                url: ctx?.request.url ?? req.originalUrl,
                user: ctx?.user?.email ?? ctx?.user?.id ?? null,
                ip: ctx?.request.ip ?? null,
                status: error instanceof HttpException ? error.getStatus() : error ? 500 : res.statusCode,
                error: error instanceof Error ? error.message : error ? String(error) : null,
                duration
            });
        }));
    }
};
MonitoringInterceptor = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [MonitoringService, LoggerService])
], MonitoringInterceptor);
export { MonitoringInterceptor };
//# sourceMappingURL=monitoring.interceptor.js.map