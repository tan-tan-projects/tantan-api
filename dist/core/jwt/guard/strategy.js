var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { RepoService } from "../../../shares/repo/repo.service.js";
import { Session } from "../../../sessions/entities/session.entity.js";
import { ContextMiddleware } from "../../middleware/context-middleware.js";
import { Monitoring } from "../../monitoring/entities/monitoring.entity.js";
let JwtStrategy = class JwtStrategy extends PassportStrategy(Strategy) {
    repo;
    constructor(config, repo) {
        const { secret } = config.getOrThrow('jwt');
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                ExtractJwt.fromAuthHeaderAsBearerToken(),
                (req) => req.cookies.authorization ?? null
            ]),
            ignoreExpiration: false,
            secretOrKey: secret
        });
        this.repo = repo;
    }
    async validate(payload) {
        const startedAt = performance.now();
        const ctx = ContextMiddleware.get();
        const monitorError = async (message, user = null) => {
            await this.repo.save(Monitoring, {
                method: ctx?.request.method ?? '',
                url: ctx?.request.url ?? '',
                user: user,
                ip: ctx?.request.ip ?? null,
                status: HttpStatus.UNAUTHORIZED,
                error: message,
                duration: performance.now() - startedAt
            });
        };
        let message = '';
        if (!payload) {
            message = 'You do not have access to this application';
            await monitorError(message);
            throw new HttpException(message, HttpStatus.UNAUTHORIZED);
        }
        if (!payload.jti) {
            message = 'Your access is unrecognized.';
            await monitorError(message, payload.email ?? payload.id ?? null);
            throw new HttpException(message, HttpStatus.UNAUTHORIZED);
        }
        const session = await this.repo.getRepository(Session).findOneBy({ jti: payload.jti });
        if (!session || session?.revoked_at) {
            message = 'Session expired or revoked';
            await monitorError(message, payload.email ?? payload.id ?? null);
            throw new HttpException(message, HttpStatus.UNAUTHORIZED);
        }
        return payload;
    }
};
JwtStrategy = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigService, RepoService])
], JwtStrategy);
export { JwtStrategy };
//# sourceMappingURL=strategy.js.map