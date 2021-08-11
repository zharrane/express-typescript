import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';

import config from './config/config';
import logging from './config/logging';

import sampleRoutes from './routes/sample';

//** */
const NAMESPACE = 'SERVER';
const app = express();

app.use((req, res, next) => {
    logging.info(NAMESPACE, `METHOD - [${req.method}] URL - [${req.url}] IP - [${req.socket.remoteAddress}]`);

    res.on('finish ', () => {
        logging.info(
            NAMESPACE,
            `METHOD - [${req.method}] URL - [${req.url}]
             IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`
        );
    });
    next();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content-Type, Accept, Authorization');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
        return res.status(200).json({});
    }
    next();
});

/**Routes  */
app.use('/', sampleRoutes);
/**     Error Handling */

app.use((req, res, next) => {
    const error = new Error('Not Found');
    return res.status(404).json({ message: error.message });
});

/** Server */

const httpserver = http.createServer(app);
httpserver.listen(config.server.port, () => logging.info(NAMESPACE, ` Server running on ${config.server.hostname}:${config.server.port}`));
