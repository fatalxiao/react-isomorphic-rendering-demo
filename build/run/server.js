/**
 * @file server.js
 */

const env = process.env.NODE_ENV;

// Statics
const config = require('../config.js');
const envConfig = require(`../env/config.${env}.js`);

// Vendors
const express = require('express');
const {createProxyMiddleware} = require('http-proxy-middleware');
const history = require('connect-history-api-fallback');
const open = require('open');
const compression = require('compression');
const logger = require('fancy-node-logger');

const app = express();
const port = envConfig.port;
const url = 'http://localhost:' + port;
const proxyTable = envConfig.proxyTable;

Object.entries(proxyTable).forEach(([context, target]) =>
    app.use(createProxyMiddleware(context, {
        target,
        changeOrigin: true,
        logLevel: 'error'
    }))
);

app.use(compression());
app.use(history());
app.use(express.static(config.assetsRoot, {
    setHeaders: (res, path) =>
        res.setHeader(
            'Cache-Control',
            path.endsWith('index.html') ?
                'no-cache, no-store, no_store, max-age=0, must-revalidate'
                :
                'max-age=315360000'
        )
}));

app.listen(port, err => {

    if (err) {
        return logger.error(err);
    }

    logger.done('> Listening at ' + url);

    open(url);

});
