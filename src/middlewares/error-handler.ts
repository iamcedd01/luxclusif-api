/* eslint-disable @typescript-eslint/no-explicit-any */
import logger from '../helpers/logger';
import { IS_PRODUCTION } from '../config/secrets';

import { Request, Response, Application } from 'express';

export default function loadErrorHandlers(app: Application) {
    app.use((_req, _res, next) => {
        interface BetterError extends Error {
            status?: number;
        }

        const err: BetterError = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    app.use((err: any, _req: Request, res: Response) => {
        if (err.name === 'ValidationError') {
            return res.status(422).json({
                errors: Object.keys(err.errors).reduce(function (errors: any, key: string) {
                    errors[key] = err.errors[key].message;

                    return errors;
                }, {}),
            });
        }

        logger.error(err);
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message,
                error: !IS_PRODUCTION ? err : {},
            },
        });
    });
}
