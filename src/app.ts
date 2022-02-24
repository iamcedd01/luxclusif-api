import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import session from 'express-session';
import compression from 'compression';
import * as bodyParser from 'body-parser';
import express, { Application } from 'express';

import './config/database';
import './helpers/passport';
import ApiRouter from './controllers';
import { apiLimiter } from './helpers/limiter';
import { SESSION_SECRET } from './config/secrets';
import loadErrorHandlers from './middlewares/error-handler';

const app: Application = express();

app.use(cors());
app.use(compression());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
    session({
        resave: false,
        secret: SESSION_SECRET,
        saveUninitialized: false,
        cookie: { maxAge: 60000 },
    })
);
app.use(apiLimiter);
app.use('/', ApiRouter);

loadErrorHandlers(app);

export default app;
