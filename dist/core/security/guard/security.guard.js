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
import { ContextMiddleware } from "../../middleware/context-middleware.js";
import { SecurityRuleType, SecurityRuleAction } from "../entity/security-rule.entity.js";
import { SecurityRuleService } from "../security.service.js";
import { LoggerService } from "../../logger/logger.service.js";
import { UtilsService } from "../../../shares/utils/utils.service.js";
import { MonitoringService } from "../../monitoring/monitoring.service.js";
let SecurityGuard = class SecurityGuard {
    service;
    monitoring;
    utils;
    constructor(service, monitoring, logger) {
        this.service = service;
        this.monitoring = monitoring;
        this.utils = new UtilsService(logger);
    }
    buildSignals(request, ctx) {
        if (!ctx)
            return [];
        const signals = [];
        const ip = ctx.request.ip;
        if (ip)
            signals.push({ type: SecurityRuleType.IP, value: ip });
        const user = ctx.user;
        const userValue = user?.id ?? user?.email ?? '';
        if (userValue)
            signals.push({ type: SecurityRuleType.USER, value: String(userValue) });
        const userAgent = ctx.request.userAgent;
        if (userAgent)
            signals.push({ type: SecurityRuleType.USER_AGENT, value: userAgent });
        if (ctx.bot.isBot) {
            if (ctx.bot.name)
                signals.push({ type: SecurityRuleType.BOT, value: ctx.bot.name });
        }
        const route = request.route?.path ?? request.path ?? '';
        if (route)
            signals.push({ type: SecurityRuleType.ROUTE, value: route });
        return signals;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const res = context.switchToHttp().getResponse();
        const ctx = ContextMiddleware.get();
        if (!ctx)
            return true;
        const signals = this.buildSignals(req, ctx);
        const rules = await this.service.findActiveBySignals(signals);
        if (rules.length === 0)
            return true;
        const blocked = rules.find(rule => rule.action === SecurityRuleAction.BLOCK);
        const path = req.route?.path;
        const startedAt = performance.now();
        if (blocked) {
            res.statusCode = HttpStatus.FORBIDDEN;
            this.utils.log(path, req, res, startedAt, 'error');
            await this.monitoring.create({
                method: ctx?.request.method ?? req.method,
                url: ctx?.request.url ?? req.originalUrl,
                user: ctx?.user?.email ?? ctx?.user?.id ?? null,
                ip: ctx?.request.ip ?? null,
                status: HttpStatus.FORBIDDEN,
                error: 'Request blocked by security policy',
                duration: performance.now() - startedAt,
            });
            throw new HttpException('Request blocked by security policy', HttpStatus.FORBIDDEN);
        }
        const allowed = rules.find(rule => rule.action === SecurityRuleAction.ALLOW);
        if (allowed)
            return true;
        return true;
    }
};
SecurityGuard = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [SecurityRuleService,
        MonitoringService,
        LoggerService])
], SecurityGuard);
export { SecurityGuard };
//# sourceMappingURL=security.guard.js.map