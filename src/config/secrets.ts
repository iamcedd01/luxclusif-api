import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export const APP_NAME = process.env.APP_NAME || 'kudlit';
export const APP_PORT = process.env.APP_PORT || 3000;
export const ENVIRONMENT = process.env.ENVIRONMENT || 'development';
export const IS_PRODUCTION = ENVIRONMENT === 'production';
export const LOG_DIRECTORY = process.env.LOG_DIRECTORY || path.resolve('logs');
export const JWT_SECRET = process.env.JWT_SECRET || APP_NAME;
export const SESSION_SECRET = process.env.SESSION_SECRET || APP_NAME;
export const DB = {
    USER: process.env.DB_USER || 'root',
    NAME: process.env.DB_NAME || 'kudlit',
    HOST: process.env.DB_HOST || 'localhost',
    PASSWORD: process.env.DB_PASSWORD || 'secret',
    PORT: parseInt(process.env.DB_PORT) || 27017,
};
