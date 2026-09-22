var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "../../users/entities/user.entity.js";
let Session = class Session {
    id;
    userId;
    jti;
    user;
    created_at;
    expires_at;
    revoked_at;
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Session.prototype, "id", void 0);
__decorate([
    Column({ nullable: false }),
    __metadata("design:type", String)
], Session.prototype, "userId", void 0);
__decorate([
    Column({ nullable: false }),
    __metadata("design:type", String)
], Session.prototype, "jti", void 0);
__decorate([
    ManyToOne(() => User, (user) => user.id),
    JoinColumn({ name: 'userId' }),
    __metadata("design:type", User)
], Session.prototype, "user", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Session.prototype, "created_at", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Date)
], Session.prototype, "expires_at", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Date)
], Session.prototype, "revoked_at", void 0);
Session = __decorate([
    Entity({ name: 'Sessions' })
], Session);
export { Session };
//# sourceMappingURL=session.entity.js.map