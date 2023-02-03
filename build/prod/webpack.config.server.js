/**
 * @file webpack.config.server.js
 */

// Statics
const config = require('../config.js');
const baseWebpackConfig = require('../webpack.config.base.js');

// Vendors
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const {resolveRootPath} = require('../utils.js');

const env = process.env.NODE_ENV;
const prodConfig = {

    target: 'node',

    mode: 'production',

    devtool: false,

    entry: './server/index.js',

    output: {
        path: config.assetsRoot,
        filename: 'server.js',
        chunkFormat: false
    },

    externals: [
        nodeExternals()
    ],

    plugins: [

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env)
        }),

        new CopyPlugin({
            patterns: [{
                from: resolveRootPath('static'),
                to: config.assetsSubDirectory
            }]
        })

    ]

};

if (env === 'analyzer') {
    prodConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = merge(baseWebpackConfig, prodConfig);
