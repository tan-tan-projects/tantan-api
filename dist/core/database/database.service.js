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
var DatabaseService_1;
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { LoggerService } from '../logger/logger.service.js';
import { InjectDataSource } from '@nestjs/typeorm';
let DatabaseService = DatabaseService_1 = class DatabaseService {
    coreDataSource;
    appDataSource;
    LOGGER;
    constructor(coreDataSource, appDataSource, logger) {
        this.coreDataSource = coreDataSource;
        this.appDataSource = appDataSource;
        this.LOGGER = logger.create(DatabaseService_1.name);
    }
    async onApplicationBootstrap() {
        if (!this.coreDataSource.isInitialized) {
            await this.coreDataSource.initialize();
            this.LOGGER.log(`Core database initialized: ${this.coreDataSource.isInitialized}`);
        }
        if (!this.appDataSource.isInitialized) {
            await this.appDataSource.initialize();
            this.LOGGER.log(`App database initialized: ${this.appDataSource.isInitialized}`);
        }
    }
    async onApplicationShutdown(signal) {
        if (this.coreDataSource.isInitialized) {
            await this.coreDataSource.destroy();
            this.LOGGER.log(`Core database destroyed: ${!this.coreDataSource.isInitialized}`);
        }
        if (this.appDataSource.isInitialized) {
            await this.appDataSource.destroy();
            this.LOGGER.log(`App database destroyed: ${!this.appDataSource.isInitialized}`);
        }
        if (signal)
            this.LOGGER.log(`Shutdown signal: ${signal}`);
    }
};
DatabaseService = DatabaseService_1 = __decorate([
    Injectable(),
    __param(0, InjectDataSource('core')),
    __param(1, InjectDataSource('app')),
    __metadata("design:paramtypes", [DataSource,
        DataSource,
        LoggerService])
], DatabaseService);
export { DatabaseService };
//# sourceMappingURL=database.service.js.map