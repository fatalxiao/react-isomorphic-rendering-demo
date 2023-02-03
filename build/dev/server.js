/**
 * @file server.js
 */

const path = require('path');
const env = process.env.NODE_ENV;

// Statics
const webpackConfig = require('./webpack.config.dev.js');
const envConfig = require(`../env/config.${env}.js`);

// Vendors
// const os = require('os');
// const chokidar = require('chokidar');
const open = require('open');
const express = require('express');
const webpack = require('webpack');
const {createProxyMiddleware} = require('http-proxy-middleware');
const history = require('connect-history-api-fallback');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const logger = require('fancy-node-logger');

const port = process.env.PORT || envConfig.port;
const url = 'http://localhost:' + port;
const proxyTable = envConfig.proxyTable;
const app = express();
const compiler = webpack(webpackConfig);
const devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath
});

devMiddleware.waitUntilValid(() =>
    logger.done(`Listening At ${url} `)
);

proxyTable && Object.entries(proxyTable).forEach(([context, target]) =>
    app.use(createProxyMiddleware(context, {
        target,
        changeOrigin: true,
        logLevel: 'error'
    }))
);

app.use(history());
app.use(devMiddleware);
app.use(path.posix.join('/', 'static'), express.static('./static'));

if (envConfig.isHotReload) {

    const hotMiddleware = webpackHotMiddleware(compiler, {
        log: false
    });

    compiler.hooks.compilation.tap('html-webpack-plugin-after-emit', () =>
        hotMiddleware.publish({
            action: 'reload'
        })
    );
    app.use(hotMiddleware);

}

module.exports = app.listen(port, err => {

    if (err) {
        return logger.error(err);
    }

    open(url);

});
