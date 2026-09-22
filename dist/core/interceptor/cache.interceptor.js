var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Inject, Injectable } from '@nestjs/common';
import { from, of, switchMap, tap } from 'rxjs';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Reflector } from '@nestjs/core';
const CACHE_TTL_KEY = 'cache_ttl';
let CacheInterceptor = class CacheInterceptor {
    cache;
    reflector;
    constructor(cache, reflector) {
        this.cache = cache;
        this.reflector = reflector;
    }
    intercept(context, next) {
        const req = context.switchToHttp().getRequest();
        const res = context.switchToHttp().getResponse();
        if (req.method !== 'GET') {
            res.setHeader('Cache-Control', 'no-store');
            return next.handle();
        }
        const ttl = this.reflector.get(CACHE_TTL_KEY, context.getHandler()) ?? 60_000;
        const refresh = req.query.refresh === 'true';
        const query = { ...req.query };
        delete query.refresh;
        const queryString = new URLSearchParams(query).toString();
        const key = queryString ? `${req.path}?${queryString}` : req.path;
        if (refresh) {
            return next.handle().pipe(tap((data) => void this.cache.set(key, data, ttl)));
        }
        return from(this.cache.get(key)).pipe(switchMap((cached) => {
            if (cached !== undefined)
                return of(cached);
            return next.handle().pipe(tap((data) => void this.cache.set(key, data, ttl)));
        }));
    }
};
CacheInterceptor = __decorate([
    Injectable(),
    __param(0, Inject(CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object, Reflector])
], CacheInterceptor);
export { CacheInterceptor };
//# sourceMappingURL=cache.interceptor.js.map