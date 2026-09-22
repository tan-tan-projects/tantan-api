import { ThrottlerGuard, type ThrottlerModuleOptions, type ThrottlerRequest, ThrottlerStorage } from "@nestjs/throttler";
import { Request } from "express";
import { Reflector } from "@nestjs/core";
import { SecurityRuleService } from "../security.service.js";
export declare class AppThrottlerGuard extends ThrottlerGuard {
    private readonly securityRule;
    constructor(options: ThrottlerModuleOptions, storageService: ThrottlerStorage, reflector: Reflector, securityRule: SecurityRuleService);
    protected getTracker(req: Request): Promise<string>;
    handleRequest(requestProps: ThrottlerRequest): Promise<boolean>;
    private createAutomaticBlock;
}
