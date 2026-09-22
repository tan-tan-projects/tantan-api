var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { SecurityRuleService } from "../security.service.js";
import { IS_PUBLIC_KEY } from "../../jwt/guard/auth.js";
import { ContextMiddleware } from "../../middleware/context-middleware.js";
import { SecurityRuleAction, SecurityRuleType } from "../entity/security-rule.entity.js";
let AuthenticatedSecurityGuard = class AuthenticatedSecurityGuard {
    reflector;
    securityRule;
    constructor(reflector, securityRule) {
        this.reflector = reflector;
        this.securityRule = securityRule;
    }
    async canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic)
            return true;
        const ctx = ContextMiddleware.get();
        if (!ctx?.user)
            return true;
        const userValue = ctx.user.id ?? ctx.user.email ?? '';
        if (!userValue)
            return true;
        const rules = await this.securityRule.findActive(SecurityRuleType.USER, String(userValue));
        const blocked = rules.some(rule => rule.action === SecurityRuleAction.BLOCK);
        if (blocked) {
            throw new HttpException('User blocked by security policy', HttpStatus.FORBIDDEN);
        }
        return true;
    }
};
AuthenticatedSecurityGuard = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Reflector,
        SecurityRuleService])
], AuthenticatedSecurityGuard);
export { AuthenticatedSecurityGuard };
//# sourceMappingURL=auth-security.guard.js.map