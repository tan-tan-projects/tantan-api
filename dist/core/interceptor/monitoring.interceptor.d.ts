import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { LoggerService } from "../logger/logger.service.js";
import { Observable } from "rxjs";
import { MonitoringService } from "../monitoring/monitoring.service.js";
export declare class MonitoringInterceptor implements NestInterceptor {
    readonly monitoring: MonitoringService;
    private utils;
    constructor(monitoring: MonitoringService, logger: LoggerService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
