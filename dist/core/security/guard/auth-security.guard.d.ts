import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { SecurityRuleService } from "../security.service.js";
export declare class AuthenticatedSecurityGuard implements CanActivate {
    private readonly reflector;
    private readonly securityRule;
    constructor(reflector: Reflector, securityRule: SecurityRuleService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
