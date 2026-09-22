import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { LoggerService } from './core/logger/logger.service.js';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { RequestMiddleware } from './core/middleware/request-middleware.js';
import { ValidationPipe } from '@nestjs/common';
import compression from 'compression';
async function bootstrap() {
    const app = await NestFactory.create(AppModule, { bufferLogs: true });
    const config = app.get(ConfigService);
    const init = config.get('app');
    app.use(compression({ threshold: 0, level: 9 }));
    app.set('trust proxy', true);
    app.disable('x-powered-by');
    app.set('query parser', 'extended');
    app.use(cookieParser());
    app.use(express.urlencoded({ extended: true }));
    app.use(bodyParser.json({ limit: '1mb' }));
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    const LOGGER = app.get(LoggerService);
    app.useLogger(LOGGER);
    const middleware = app.get(RequestMiddleware);
    app.use((req, res, next) => middleware.use(req, res, next));
    app.enableShutdownHooks();
    await app.listen(init?.port || 3000, async () => {
        LOGGER.log(`PID Number on ${process.pid}`);
        LOGGER.log(`===== Application on ${await app.getUrl()} =====`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map