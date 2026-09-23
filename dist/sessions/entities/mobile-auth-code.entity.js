var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Index, Column, CreateDateColumn } from "typeorm";
let MobileAuthCode = class MobileAuthCode {
    id;
    code;
    access_token;
    expires_at;
    created_at;
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], MobileAuthCode.prototype, "id", void 0);
__decorate([
    Index({ unique: true }),
    Column({ nullable: false }),
    __metadata("design:type", String)
], MobileAuthCode.prototype, "code", void 0);
__decorate([
    Column({ nullable: false }),
    __metadata("design:type", String)
], MobileAuthCode.prototype, "access_token", void 0);
__decorate([
    Column({ nullable: false }),
    __metadata("design:type", Date)
], MobileAuthCode.prototype, "expires_at", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], MobileAuthCode.prototype, "created_at", void 0);
MobileAuthCode = __decorate([
    Entity({ name: 'MobileAuthCodes' })
], MobileAuthCode);
export { MobileAuthCode };
//# sourceMappingURL=mobile-auth-code.entity.js.map