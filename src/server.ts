import app from './app';
import logger from './helpers/logger';
import { APP_PORT } from './config/secrets';

process.once('SIGUSR2', function () {
    process.kill(process.pid, 'SIGUSR2');
});

process.on('SIGINT', function () {
    // this is only called on ctrl+c, not restart
    process.kill(process.pid, 'SIGINT');
});

app.listen(APP_PORT, () => {
    logger.info(`Server running on port: ${APP_PORT}`);
    console.log(`Server running on port: ${APP_PORT}`);
}).on('error', e => logger.error(e));
