import mongoose, { ConnectOptions } from 'mongoose';

import logger from '../helpers/logger';
import { DB } from '../config/secrets';

// const db_uri = `mongodb://${DB.USER}:${encodeURIComponent(DB.PASSWORD)}@${DB.HOST}:${DB.PORT}/${
//     DB.NAME
// }?ssl=true&replicaSet=atlas-ghugxq-shard-0&authSource=admin&retryWrites=true&w=majority`;

const db_uri = `mongodb://${DB.HOST}:${DB.PORT}/${DB.NAME}`;

const options: ConnectOptions = {
    autoIndex: true,
    maxPoolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};

mongoose
    .connect(db_uri, options)
    .then(() => {
        logger.info('Mongoose connection done');
    })
    .catch(e => {
        logger.error('Mongoose connection error');
        logger.error(e);
    });

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {
    logger.info(`Mongoose default connection open to ${db_uri}`);
});

// If the connection throws an error
mongoose.connection.on('error', err => {
    logger.error(`Mongoose default connection error ${err}`);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
    logger.info('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        logger.info('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});
