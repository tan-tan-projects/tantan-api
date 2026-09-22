var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, Entity } from "typeorm";
let Portfolio = class Portfolio {
    id;
    title;
    description;
    image;
    url;
    is_active;
    created_at;
    updated_at;
    deleted_at;
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Portfolio.prototype, "id", void 0);
__decorate([
    Column({ nullable: false }),
    __metadata("design:type", String)
], Portfolio.prototype, "title", void 0);
__decorate([
    Column({ nullable: false }),
    __metadata("design:type", String)
], Portfolio.prototype, "description", void 0);
__decorate([
    Column({ nullable: false }),
    __metadata("design:type", String)
], Portfolio.prototype, "image", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], Portfolio.prototype, "url", void 0);
__decorate([
    Column({ default: false }),
    __metadata("design:type", Boolean)
], Portfolio.prototype, "is_active", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Portfolio.prototype, "created_at", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Portfolio.prototype, "updated_at", void 0);
__decorate([
    DeleteDateColumn(),
    __metadata("design:type", Date)
], Portfolio.prototype, "deleted_at", void 0);
Portfolio = __decorate([
    Entity({ name: 'Portfolios' })
], Portfolio);
export { Portfolio };
//# sourceMappingURL=portfolio.entity.js.map