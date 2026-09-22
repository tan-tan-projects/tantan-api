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
let Resource = class Resource {
    id;
    userId;
    publicId;
    resourceType;
    format;
    bytes;
    width;
    height;
    status;
    error;
    created_at;
    updated_at;
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Resource.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Resource.prototype, "userId", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Resource.prototype, "publicId", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Resource.prototype, "resourceType", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], Resource.prototype, "format", void 0);
__decorate([
    Column({ default: 0 }),
    __metadata("design:type", Number)
], Resource.prototype, "bytes", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Number)
], Resource.prototype, "width", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Number)
], Resource.prototype, "height", void 0);
__decorate([
    Column({ default: 'TEMPORARY' }),
    __metadata("design:type", String)
], Resource.prototype, "status", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], Resource.prototype, "error", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Resource.prototype, "created_at", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Resource.prototype, "updated_at", void 0);
Resource = __decorate([
    Entity({ name: 'Resources' })
], Resource);
export { Resource };
//# sourceMappingURL=resource.entity.js.map