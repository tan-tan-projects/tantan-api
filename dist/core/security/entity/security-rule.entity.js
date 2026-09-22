var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
export var SecurityRuleType;
(function (SecurityRuleType) {
    SecurityRuleType["IP"] = "ip";
    SecurityRuleType["USER"] = "user";
    SecurityRuleType["USER_AGENT"] = "user-agent";
    SecurityRuleType["BOT"] = "bot";
    SecurityRuleType["ROUTE"] = "route";
})(SecurityRuleType || (SecurityRuleType = {}));
export var SecurityRuleAction;
(function (SecurityRuleAction) {
    SecurityRuleAction["ALLOW"] = "allow";
    SecurityRuleAction["BLOCK"] = "block";
})(SecurityRuleAction || (SecurityRuleAction = {}));
let SecurityRule = class SecurityRule {
    id;
    type;
    action;
    value;
    description;
    is_active;
    expires_at;
    created_at;
    updated_at;
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], SecurityRule.prototype, "id", void 0);
__decorate([
    Column({ type: 'enum', enum: SecurityRuleType }),
    __metadata("design:type", String)
], SecurityRule.prototype, "type", void 0);
__decorate([
    Column({ type: 'enum', enum: SecurityRuleAction }),
    __metadata("design:type", String)
], SecurityRule.prototype, "action", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], SecurityRule.prototype, "value", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], SecurityRule.prototype, "description", void 0);
__decorate([
    Column({ default: true }),
    __metadata("design:type", Boolean)
], SecurityRule.prototype, "is_active", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Date)
], SecurityRule.prototype, "expires_at", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], SecurityRule.prototype, "created_at", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], SecurityRule.prototype, "updated_at", void 0);
SecurityRule = __decorate([
    Entity({ name: 'SecurityRule' })
], SecurityRule);
export { SecurityRule };
//# sourceMappingURL=security-rule.entity.js.map