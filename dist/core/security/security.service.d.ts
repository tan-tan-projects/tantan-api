import { RepoService } from "../../shares/repo/repo.service.js";
import { SecurityRule, SecurityRuleAction, SecurityRuleType } from "./entity/security-rule.entity.js";
export declare class SecurityRuleService {
    readonly repo: RepoService;
    constructor(repo: RepoService);
    create(type: SecurityRuleType, value: string, durationMs: number): Promise<SecurityRule | null>;
    blockBot(type: SecurityRuleType, value: string, description: string): Promise<({
        type: SecurityRuleType;
        action: SecurityRuleAction.BLOCK;
        value: string;
        description: string;
        is_active: true;
    } & SecurityRule) | undefined>;
    findActive(type: SecurityRuleType, value: string): Promise<SecurityRule[]>;
    findActiveBySignals(signals: Array<{
        type: SecurityRuleType;
        value: string;
    }>): Promise<SecurityRule[]>;
    isAllowed(type: SecurityRuleType, value: string): Promise<boolean>;
    isBlocked(type: SecurityRuleType, value: string): Promise<boolean>;
}
