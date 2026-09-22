import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import type { Cache } from 'cache-manager';
import { Reflector } from '@nestjs/core';
export declare class CacheInterceptor implements NestInterceptor {
    private readonly cache;
    private readonly reflector;
    constructor(cache: Cache, reflector: Reflector);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
