var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { CoreModule } from './core/core.module.js';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';
import { SessionsModule } from './sessions/sessions.module.js';
import { PortfoliosModule } from './portfolios/portfolios.module.js';
import { SharesModule } from './shares/shares.module.js';
import { ResourcesModule } from './resources/resources.module.js';
import { SalesModule } from './sales/sales.module.js';
let AppModule = class AppModule {
};
AppModule = __decorate([
    Module({
        imports: [
            AuthModule,
            CoreModule,
            UsersModule,
            SessionsModule,
            PortfoliosModule,
            ResourcesModule,
            SalesModule,
            SharesModule
        ],
        controllers: [AppController],
        providers: [AppService],
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map