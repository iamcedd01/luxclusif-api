import * as fs from 'fs';
import DailyRotateFile from 'winston-daily-rotate-file';
import { format, transports, createLogger } from 'winston';
import { ENVIRONMENT, LOG_DIRECTORY } from '../config/secrets';

const dir = LOG_DIRECTORY;

// Create directory if it is not present
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

const logLevel = ENVIRONMENT === 'development' ? 'debug' : 'warn';

const options = {
    file: {
        level: logLevel,
        filename: dir + '/%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        timestamp: true,
        handleExceptions: true,
        humanReadableUnhandledException: true,
        prettyPrint: true,
        json: true,
        maxSize: '20m',
        colorSize: true,
        maxFiles: '14d',
    },
};

export default createLogger({
    transports: [
        new transports.Console({
            stderrLevels: ['info', 'error'],
            format: format.combine(format.errors({ stack: true }), format.prettyPrint()),
        }),
    ],
    exceptionHandlers: [new DailyRotateFile(options.file)],
    exitOnError: false, // Do not exit on handled exceptions
});
