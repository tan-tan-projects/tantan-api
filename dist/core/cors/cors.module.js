var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { CorsService } from './cors.service.js';
import { RepoService } from '../../shares/repo/repo.service.js';
import { CorsController } from './cors.controller.js';
let CorsModule = class CorsModule {
};
CorsModule = __decorate([
    Module({
        providers: [CorsService, RepoService],
        controllers: [CorsController],
        exports: [CorsService]
    })
], CorsModule);
export { CorsModule };
//# sourceMappingURL=cors.module.js.map