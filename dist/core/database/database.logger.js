export class DatabaseLogger {
    LOGGER;
    constructor(logs, name) {
        this.LOGGER = logs.create(`Database:${name}`);
    }
    logQuery(query, parameters) {
        this.LOGGER.debug({
            name: 'query',
            query,
            parameters
        });
    }
    logQueryError(error, query, parameters) {
        this.LOGGER.debug({
            name: 'error',
            error,
            query,
            parameters
        });
    }
    logQuerySlow(time, query, parameters) {
        this.LOGGER.debug({
            name: 'slow',
            time,
            query,
            parameters
        });
    }
    logSchemaBuild(message) {
        this.LOGGER.debug({
            name: 'schema',
            message
        });
    }
    logMigration(message) {
        this.LOGGER.debug({
            name: 'migration',
            message
        });
    }
    log(level, message) {
        this.LOGGER[level]({ message });
    }
}
//# sourceMappingURL=database.logger.js.map