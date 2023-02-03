/**
 * @file prod.js
 */

// Vendors
const fs = require('fs');
const webpack = require('webpack');
const startCase = require('lodash/startCase');
const logger = require('fancy-node-logger');
const {installDependencies} = require('../utils.js');

// Statics
const config = require('../config.js');
const serverWebpackConfig = require('./webpack.config.server.js');
const clientWebpackConfig = require('./webpack.config.client.js');

const env = process.env.NODE_ENV;

logger.wait(`Building ${startCase(env)} Package...`);

webpack(serverWebpackConfig, (err, stats) => {

    if (err) {
        throw err;
    }

    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n\n');

    webpack(clientWebpackConfig, async (err, stats) => {

        if (err) {
            throw err;
        }

        try {

            process.stdout.write(stats.toString({
                colors: true,
                modules: false,
                children: false,
                chunks: false,
                chunkModules: false
            }) + '\n\n');

            if (env === 'analyzer') {
                return;
            }

            // copyRecursionSync('build/release', config.rootDirectory);
            // fs.copyFileSync(`build/env/config.${env}.js`, `${config.rootDirectory}/config.js`);
            fs.copyFileSync('build/release/package.json', `${config.rootDirectory}/package.json`);

            logger.wait('Installing Dependencies...');
            await installDependencies(config.rootDirectory);
            logger.done('Install Dependencies complete\n');

            logger.done(`Build ${startCase(env)} Package complete`);

        } catch (e) {
            logger.error(e);
        }

    });

});
