import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';

import config from './config/config';
import login from './config/login';

const NAMESPACE = 'server';
const app = express();

app.use((req, res, next) => {
    login.info(NAMESPACE, `METHOD - [${req.method}] URL - [${req.url}] IP - [${req.socket.remoteAddress}]`);

    res.on('finish ', () => {
        login.info(
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

/**     Error Handling */

app.use((req, res, next) => {
    const error = new Error('Not Found');
    return res.status(404).json({ message: error.message });
});

/** Server */

const httpserver = http.createServer(app);
httpserver.listen(config.server.port, () => login.info(NAMESPACE, ` Server running on ${config.server.hostname}:${config.server.port}`));
