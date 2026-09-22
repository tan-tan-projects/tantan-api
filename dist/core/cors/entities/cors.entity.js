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
let CorsOrigin = class CorsOrigin {
    id;
    origin;
    is_active;
    created_at;
    updated_at;
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], CorsOrigin.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], CorsOrigin.prototype, "origin", void 0);
__decorate([
    Column({ default: true }),
    __metadata("design:type", Boolean)
], CorsOrigin.prototype, "is_active", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], CorsOrigin.prototype, "created_at", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], CorsOrigin.prototype, "updated_at", void 0);
CorsOrigin = __decorate([
    Entity({ name: 'CorsOrigin' })
], CorsOrigin);
export { CorsOrigin };
//# sourceMappingURL=cors.entity.js.map