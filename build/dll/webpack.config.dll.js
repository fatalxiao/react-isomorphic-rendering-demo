/**
 * @file webpack.config.dll.js
 */

// Statics
const config = require('../config.js');
const utils = require('../utils.js');

// Vendors
const {IgnorePlugin, DllPlugin} = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const env = process.env.NODE_ENV;
const library = '[name]_lib';

module.exports = {

    mode: 'production',

    entry: {
        'polyfill': ['@babel/polyfill'],
        'moment': ['moment', 'twix'],
        'react': [
            'react', 'react-dom', 'vivy', 'vivy-api', 'vivy-async-component', 'react-redux',
            'react-router', 'react-router-dom', 'react-router-config', 'connected-react-router'
        ],
        'tools': ['classnames', 'history']
    },

    output: {
        publicPath: './',
        path: config.assetsRoot,
        filename: utils.getAssetsSubPath('vendors/[name].[chunkhash].js', env),
        library
    },

    plugins: [

        new IgnorePlugin({
            contextRegExp: /^\.\/locale$/,
            resourceRegExp: /moment$/
        }),

        new DllPlugin({
            context: __dirname,
            path: utils.getAssetsVendorsAbsolutePath('[name]-manifest.json', env),
            name: library
        }),

        new AssetsPlugin({
            path: config.assetsRoot,
            filename: utils.getAssetsSubPath('vendors/vendors-assets.json', env)
        }),

        new CompressionPlugin({
            test: new RegExp('\\.(' + config.productionGzipExtensions.join('|') + ')$'),
            filename: '[path][base].gz[query]'
        })

    ]

};
