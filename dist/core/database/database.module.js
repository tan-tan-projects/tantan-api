var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DatabaseModule_1;
import { Module } from "@nestjs/common";
import { DatabaseService } from "./database.service.js";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseLogger } from "./database.logger.js";
import { LoggerService } from "../logger/logger.service.js";
import { ConfigService } from "@nestjs/config";
import { createGoogleSheetsDataSource } from "tantan-typeorm-gs";
import configService from "../config/config.service.js";
let DatabaseModule = DatabaseModule_1 = class DatabaseModule {
    static register() {
        const config = configService();
        const databases = Object.entries(config.database);
        return {
            module: DatabaseModule_1,
            imports: databases.map(([name]) => TypeOrmModule.forRootAsync({
                name,
                inject: [ConfigService, LoggerService],
                useFactory: (config, logger) => {
                    const database = config.getOrThrow(`database.${name}`);
                    const value = { ...database, name, logger: new DatabaseLogger(logger, name) };
                    return value;
                },
                dataSourceFactory: async (options) => createGoogleSheetsDataSource(options),
            })),
        };
    }
};
DatabaseModule = DatabaseModule_1 = __decorate([
    Module({
        imports: [DatabaseModule.register()],
        providers: [DatabaseService],
        exports: [DatabaseService]
    })
], DatabaseModule);
export { DatabaseModule };
//# sourceMappingURL=database.module.js.map