import { OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { LoggerService } from '../logger/logger.service.js';
export declare class DatabaseService implements OnApplicationBootstrap, OnApplicationShutdown {
    readonly coreDataSource: DataSource;
    readonly appDataSource: DataSource;
    private LOGGER;
    constructor(coreDataSource: DataSource, appDataSource: DataSource, logger: LoggerService);
    onApplicationBootstrap(): Promise<void>;
    onApplicationShutdown(signal?: string): Promise<void>;
}
