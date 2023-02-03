/**
 * @file server.js
 */

const path = require('path');

// Statics
const config = require('./config.js');

// Vendors
const express = require('express');
const {createProxyMiddleware} = require('http-proxy-middleware');
const getBody = require('http-proxy-middleware-body');
const history = require('connect-history-api-fallback');
const cookieParser = require('cookie-parser');
const compression = require('compression');

const app = express();
const port = process.env.port || config.port;
const uri = 'http://localhost:' + port;
const proxyTable = config.proxyTable;

Object.keys(proxyTable).forEach(context => {

    let options = proxyTable[context];

    if (typeof options === 'string') {
        options = {
            target: options,
            changeOrigin: true
        };
    }

    app.use(createProxyMiddleware(options.filter || context, options));

});

app.use(compression());

app.use(history());

app.use(express.static(path.join(__dirname, 'dist'), {
    setHeaders: (res, path) => res.setHeader('Cache-Control', path.endsWith('index.html') ?
        'no-cache, no-store, no_store, max-age=0, must-revalidate' : 'max-age=2592000')
}));

app.listen(port, err => {

    if (err) {
        return console.log(err);
    }

    console.log('> Listening at ' + uri);

});
