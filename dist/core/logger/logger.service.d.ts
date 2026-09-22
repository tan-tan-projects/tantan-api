import { ConsoleLogger } from '@nestjs/common';
export declare class LoggerService extends ConsoleLogger {
    private isDev;
    constructor();
    handleLogger(): void;
    create(context: string): ConsoleLogger;
}
