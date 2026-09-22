var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpException, HttpStatus, Injectable, SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
let JwtAuthGuard = class JwtAuthGuard extends AuthGuard('jwt') {
    reflector;
    constructor(reflector) {
        super();
        this.reflector = reflector;
    }
    canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic)
            return true;
        return super.canActivate(context);
    }
    handleRequest(err, user, info) {
        if (err || !user) {
            let errorMessage = 'Invalid authorized';
            if (info && info.name) {
                switch (info.name) {
                    case "TokenExpiredError":
                        errorMessage = "Token Expired";
                        break;
                    case "JsonWebTokenError":
                        errorMessage = "Token is null or Invalid Signature";
                        break;
                }
            }
            throw err || new HttpException(errorMessage, HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
};
JwtAuthGuard = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Reflector])
], JwtAuthGuard);
export { JwtAuthGuard };
//# sourceMappingURL=auth.js.map