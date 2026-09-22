var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ConsoleLogger, Injectable } from '@nestjs/common';
let LoggerService = class LoggerService extends ConsoleLogger {
    isDev = process.env.APP_ENV === 'dev';
    constructor() {
        super('AppLogger', { prefix: process.env.APP_NAME || 'NEST-APP' });
        this.handleLogger();
    }
    handleLogger() {
        if (this.isDev)
            this.setLogLevels(['log', 'error', 'debug', 'fatal', 'verbose', 'warn']);
        else
            this.setLogLevels(['log', 'error', 'warn']);
    }
    create(context) {
        const logger = new ConsoleLogger(context, { prefix: process.env.APP_NAME || 'NEST-APP' });
        if (this.isDev)
            logger.setLogLevels(['log', 'error', 'debug', 'fatal', 'verbose', 'warn']);
        else
            logger.setLogLevels(['log', 'error', 'warn']);
        return logger;
    }
};
LoggerService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], LoggerService);
export { LoggerService };
//# sourceMappingURL=logger.service.js.map