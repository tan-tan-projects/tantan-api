var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from '../core/jwt/guard/strategy.js';
import { RepoService } from '../shares/repo/repo.service.js';
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    Module({
        imports: [
            JwtModule.registerAsync({
                inject: [ConfigService],
                useFactory: (config) => {
                    const { secret, expiresIn } = config.getOrThrow('JWT_KEY');
                    return ({ secret, signOptions: { expiresIn } });
                }
            })
        ],
        controllers: [AuthController],
        providers: [AuthService, JwtStrategy, RepoService]
    })
], AuthModule);
export { AuthModule };
//# sourceMappingURL=auth.module.js.map