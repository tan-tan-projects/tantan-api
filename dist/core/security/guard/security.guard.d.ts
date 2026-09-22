import { CanActivate, ExecutionContext } from "@nestjs/common";
import { SecurityRuleService } from "../security.service.js";
import { LoggerService } from "../../logger/logger.service.js";
import { MonitoringService } from "../../monitoring/monitoring.service.js";
export declare class SecurityGuard implements CanActivate {
    readonly service: SecurityRuleService;
    readonly monitoring: MonitoringService;
    private utils;
    constructor(service: SecurityRuleService, monitoring: MonitoringService, logger: LoggerService);
    private buildSignals;
    canActivate(context: ExecutionContext): Promise<boolean>;
}
