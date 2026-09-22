var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@nestjs/common";
import { RepoService } from "../../shares/repo/repo.service.js";
import { SecurityRule, SecurityRuleAction } from "./entity/security-rule.entity.js";
import { Raw } from "typeorm";
let SecurityRuleService = class SecurityRuleService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create(type, value, durationMs) {
        if (!value)
            return null;
        const existingRules = await this.findActive(type, value);
        const existingBlock = existingRules.find(rule => rule.action === SecurityRuleAction.BLOCK);
        if (existingBlock)
            return existingBlock;
        return this.repo.getRepository(SecurityRule).save({
            type,
            action: SecurityRuleAction.BLOCK,
            value,
            description: 'Automatically blocked by rate limit',
            is_active: true,
            expires_at: new Date(Date.now() + durationMs),
        });
    }
    async blockBot(type, value, description) {
        const exists = await this.findActive(type, value);
        if (exists.length)
            return;
        return this.repo.getRepository(SecurityRule).save({
            type,
            action: SecurityRuleAction.BLOCK,
            value,
            description,
            is_active: true
        });
    }
    async findActive(type, value) {
        if (!value)
            return [];
        const now = new Date();
        return await this.repo.find(SecurityRule, {
            where: {
                type,
                value,
                is_active: true,
                expires_at: Raw((alias) => `(${alias} IS NULL OR ${alias} > :now)`, { now }),
            },
            order: {
                created_at: 'DESC',
            },
        });
    }
    async findActiveBySignals(signals) {
        const results = await Promise.all(signals
            .filter(signal => Boolean(signal.value))
            .map(signal => this.findActive(signal.type, signal.value)));
        return results.flat();
    }
    async isAllowed(type, value) {
        const rules = await this.findActive(type, value);
        return rules.some(rule => rule.action === SecurityRuleAction.ALLOW);
    }
    async isBlocked(type, value) {
        const rules = await this.findActive(type, value);
        return rules.some(rule => rule.action === SecurityRuleAction.BLOCK);
    }
};
SecurityRuleService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [RepoService])
], SecurityRuleService);
export { SecurityRuleService };
//# sourceMappingURL=security.service.js.map