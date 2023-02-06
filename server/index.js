/**
 * @file index.js
 */

// Node
// import path from 'path';

// React
import React from 'react';
import {StaticRouter} from 'react-router-dom';
import {renderToPipeableStream} from 'react-dom/server';

// Components
import AppContainer from '../client/AppContainer';

// Vendors
import express from 'express';
// import {createProxyMiddleware} from 'http-proxy-middleware';
// import history from 'connect-history-api-fallback';
// import compression from 'compression';

// Statics
import profiles from '../profiles';

const env = process.env.NODE_ENV;

const app = express();
const port = process.env.port || profiles[env].port;
const uri = 'http://localhost:' + port;
// const proxyTable = profiles[env].proxyTable;

// Object.keys(proxyTable).forEach(context => {
//
//     let options = proxyTable[context];
//
//     if (typeof options === 'string') {
//         options = {
//             target: options,
//             changeOrigin: true
//         };
//     }
//
//     app.use(createProxyMiddleware(options.filter || context, options));
//
// });

// app.use(express.static(path.join(__dirname, 'dist'), {
//     setHeaders: (res, path) => res.setHeader('Cache-Control', path.endsWith('index.html') ?
//         'no-cache, no-store, no_store, max-age=0, must-revalidate' : 'max-age=2592000')
// }));

const render = (request, response) => {

    let didError = false;

    return new Promise((resolve, reject) => {
        const stream = renderToPipeableStream(
            <StaticRouter location={request.url}>
                <AppContainer/>
            </StaticRouter>,
            {
                // bootstrapScripts: ['/index.js'],
                onShellReady() {
                    response.statusCode = didError ? 500 : 200;
                    response.setHeader('content-type', 'text/html');
                    stream.pipe(response);
                    resolve();
                },
                onError() {
                    didError = true;
                    reject();
                }
            }
        );
        setTimeout(() => {
            stream.abort();
            reject();
        }, 10000);
    });

};

app.use('/', async (request, response) => {
    await render(request, response);
});

// app.use(history());

// app.use(compression());

app.listen(port, err => {

    if (err) {
        return console.log(err);
    }

    console.log('> Listening at ' + uri);

});
