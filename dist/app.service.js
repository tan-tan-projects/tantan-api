var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { LoggerService } from './core/logger/logger.service.js';
import { CloudinaryService } from './shares/cloudinary/cloudinary.service.js';
import { GeminiService } from './shares/gemini/gemini.service.js';
import configService from './core/config/config.service.js';
let AppService = class AppService {
    cloudinary;
    gemini;
    LOGGER;
    constructor(logger, cloudinary, gemini) {
        this.cloudinary = cloudinary;
        this.gemini = gemini;
        this.LOGGER = logger.create('Main');
    }
    getHello() {
        return 'Hello World!';
    }
    getTest() {
        const config = configService();
        const data = Object.values(config.database).map((val) => val);
        return data;
    }
    getCofig() {
        return this.cloudinary.getClient();
    }
    async geminiTest() {
        const response = await this.gemini.generate('Say hello in Indonesian and explain in one short sentence what you are.');
        return {
            success: true,
            response,
        };
    }
};
AppService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [LoggerService,
        CloudinaryService,
        GeminiService])
], AppService);
export { AppService };
//# sourceMappingURL=app.service.js.map