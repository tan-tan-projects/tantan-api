var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Injectable } from "@nestjs/common";
import { InjectThrottlerOptions, InjectThrottlerStorage, ThrottlerGuard, ThrottlerStorage, } from "@nestjs/throttler";
import { Reflector } from "@nestjs/core";
import { ContextMiddleware } from "../../middleware/context-middleware.js";
import { SecurityRuleService } from "../security.service.js";
import { SecurityRuleType } from "../entity/security-rule.entity.js";
let AppThrottlerGuard = class AppThrottlerGuard extends ThrottlerGuard {
    securityRule;
    constructor(options, storageService, reflector, securityRule) {
        super(options, storageService, reflector);
        this.securityRule = securityRule;
    }
    async getTracker(req) {
        const ctx = ContextMiddleware.get();
        const user = ctx?.user;
        if (user?.id) {
            return `user:${user.id}`;
        }
        return `ip:${ctx?.request.ip ?? req.ip ?? 'unknown'}`;
    }
    async handleRequest(requestProps) {
        const { context, limit, ttl, throttler, blockDuration, getTracker, generateKey, } = requestProps;
        const request = context.switchToHttp().getRequest();
        const tracker = await getTracker(request, context);
        const throttlerName = throttler.name ?? 'default';
        const key = generateKey(context, tracker, throttlerName);
        const { totalHits, timeToExpire, isBlocked, timeToBlockExpire, } = await this.storageService.increment(key, ttl, limit, blockDuration, throttlerName);
        if (isBlocked) {
            await this.createAutomaticBlock();
            await this.throwThrottlingException(context, {
                limit,
                ttl,
                key,
                tracker,
                totalHits,
                timeToExpire,
                isBlocked,
                timeToBlockExpire,
            });
        }
        return true;
    }
    async createAutomaticBlock() {
        const ctx = ContextMiddleware.get();
        if (!ctx)
            return;
        const user = ctx.user;
        if (user?.id) {
            await this.securityRule.create(SecurityRuleType.USER, String(user.id), 5 * 60 * 1000);
            return;
        }
        const ip = ctx.request.ip;
        if (!ip)
            return;
        await this.securityRule.create(SecurityRuleType.IP, ip, 5 * 60 * 1000);
    }
};
AppThrottlerGuard = __decorate([
    Injectable(),
    __param(0, InjectThrottlerOptions()),
    __param(1, InjectThrottlerStorage()),
    __metadata("design:paramtypes", [Object, Object, Reflector,
        SecurityRuleService])
], AppThrottlerGuard);
export { AppThrottlerGuard };
//# sourceMappingURL=throttler.guard.js.map