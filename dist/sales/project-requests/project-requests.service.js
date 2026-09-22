var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { ProjectRequest } from './entities/project-request.entity.js';
import { RepoService } from '../../shares/repo/repo.service.js';
let ProjectRequestsService = class ProjectRequestsService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    create(data) {
        return this.repo.save(ProjectRequest, {
            business: data.business.trim(),
            goal: data.goal.trim(),
            target_audience: data.target_audience.trim(),
            requirements: JSON.stringify(data.requirements.map(value => value.trim()).filter(Boolean)),
            name: data.name.trim(),
            email: data.email.trim(),
            phone: data.phone.trim(),
        });
    }
    findAll(query) {
        return this.repo.findWithPagination(ProjectRequest, query);
    }
};
ProjectRequestsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [RepoService])
], ProjectRequestsService);
export { ProjectRequestsService };
//# sourceMappingURL=project-requests.service.js.map