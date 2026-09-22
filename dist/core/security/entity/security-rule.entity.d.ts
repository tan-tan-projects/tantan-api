export declare enum SecurityRuleType {
    IP = "ip",
    USER = "user",
    USER_AGENT = "user-agent",
    BOT = "bot",
    ROUTE = "route"
}
export declare enum SecurityRuleAction {
    ALLOW = "allow",
    BLOCK = "block"
}
export declare class SecurityRule {
    id: string;
    type: SecurityRuleType;
    action: SecurityRuleAction;
    value: string;
    description: string;
    is_active: boolean;
    expires_at: Date;
    created_at: Date;
    updated_at: Date;
}
