import { ConsoleLogger } from '@nestjs/common';
import { Logger as TypeOrmLogger } from 'typeorm';
import { LoggerService } from '../logger/logger.service.js';
export declare class DatabaseLogger implements TypeOrmLogger {
    readonly LOGGER: ConsoleLogger;
    constructor(logs: LoggerService, name: string);
    logQuery(query: string, parameters?: any[]): void;
    logQueryError(error: string | Error, query: string, parameters?: any[]): void;
    logQuerySlow(time: number, query: string, parameters?: any[]): void;
    logSchemaBuild(message: string): void;
    logMigration(message: string): void;
    log(level: 'log' | 'info' | 'warn', message: any): void;
}
