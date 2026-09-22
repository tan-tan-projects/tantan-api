var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";
let ProjectRequest = class ProjectRequest {
    id;
    business;
    goal;
    target_audience;
    requirements;
    name;
    email;
    phone;
    created_at;
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], ProjectRequest.prototype, "id", void 0);
__decorate([
    Column({ nullable: false }),
    __metadata("design:type", String)
], ProjectRequest.prototype, "business", void 0);
__decorate([
    Column({ nullable: false }),
    __metadata("design:type", String)
], ProjectRequest.prototype, "goal", void 0);
__decorate([
    Column({ nullable: false }),
    __metadata("design:type", String)
], ProjectRequest.prototype, "target_audience", void 0);
__decorate([
    Column({ nullable: false }),
    __metadata("design:type", String)
], ProjectRequest.prototype, "requirements", void 0);
__decorate([
    Column({ nullable: false }),
    __metadata("design:type", String)
], ProjectRequest.prototype, "name", void 0);
__decorate([
    Column({ nullable: false }),
    __metadata("design:type", String)
], ProjectRequest.prototype, "email", void 0);
__decorate([
    Column({ nullable: false }),
    __metadata("design:type", String)
], ProjectRequest.prototype, "phone", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], ProjectRequest.prototype, "created_at", void 0);
ProjectRequest = __decorate([
    Entity({ name: 'ProjectRequests' })
], ProjectRequest);
export { ProjectRequest };
//# sourceMappingURL=project-request.entity.js.map