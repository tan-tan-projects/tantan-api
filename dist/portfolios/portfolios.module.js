var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { PortfoliosService } from './portfolios.service.js';
import { PortfoliosController } from './portfolios.controller.js';
import { RepoService } from '../shares/repo/repo.service.js';
import { CloudinaryService } from '../shares/cloudinary/cloudinary.service.js';
let PortfoliosModule = class PortfoliosModule {
};
PortfoliosModule = __decorate([
    Module({
        controllers: [PortfoliosController],
        providers: [PortfoliosService, RepoService, CloudinaryService],
    })
], PortfoliosModule);
export { PortfoliosModule };
//# sourceMappingURL=portfolios.module.js.map