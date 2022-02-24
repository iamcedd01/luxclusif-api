import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

const validator = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();

    const extractedErrors = errors.array().reduce((obj: any, item) => {
        obj[item.param] = item.msg;
        return obj;
    }, {});

    return res.status(422).json({
        errors: extractedErrors,
    });
};

export default validator;
