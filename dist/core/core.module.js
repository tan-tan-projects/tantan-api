var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Global, Module } from '@nestjs/common';
import { LoggerService } from './logger/logger.service.js';
import { ConfigModule } from '@nestjs/config';
import configService from './config/config.service.js';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { MonitoringInterceptor } from './interceptor/monitoring.interceptor.js';
import { JwtAuthGuard } from './jwt/guard/auth.js';
import { FileUploadInterceptor } from './interceptor/upload.interceptor.js';
import { SecurityModule } from './security/security.module.js';
import { MonitoringModule } from './monitoring/monitoring.module.js';
import { SecurityGuard } from './security/guard/security.guard.js';
import { AuthenticatedSecurityGuard } from './security/guard/auth-security.guard.js';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppThrottlerGuard } from './security/guard/throttler.guard.js';
import { CorsModule } from './cors/cors.module.js';
import { RequestMiddleware } from './middleware/request-middleware.js';
import { DatabaseModule } from './database/database.module.js';
let CoreModule = class CoreModule {
};
CoreModule = __decorate([
    Global(),
    Module({
        imports: [
            ConfigModule.forRoot({ isGlobal: true, load: [configService] }),
            CacheModule.register({ ttl: 180_000, isGlobal: true }),
            ThrottlerModule.forRoot({
                throttlers: [
                    {
                        name: 'default',
                        ttl: 60_000,
                        limit: 20,
                    },
                ],
            }),
            DatabaseModule,
            SecurityModule,
            MonitoringModule,
            CorsModule
        ],
        providers: [
            LoggerService,
            RequestMiddleware,
            { provide: APP_INTERCEPTOR, useClass: MonitoringInterceptor },
            { provide: APP_INTERCEPTOR, useClass: FileUploadInterceptor },
            { provide: APP_INTERCEPTOR, useClass: CacheInterceptor },
            { provide: APP_GUARD, useClass: SecurityGuard },
            { provide: APP_GUARD, useClass: JwtAuthGuard },
            { provide: APP_GUARD, useClass: AuthenticatedSecurityGuard },
            { provide: APP_GUARD, useClass: AppThrottlerGuard },
        ],
        exports: [LoggerService, RequestMiddleware],
    })
], CoreModule);
export { CoreModule };
//# sourceMappingURL=core.module.js.map