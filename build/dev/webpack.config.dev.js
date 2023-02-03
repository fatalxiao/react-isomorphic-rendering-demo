/**
 * @file webpack.config.dev.js
 */

// Vendors
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const HtmlPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

// Statics
const baseWebpackConfig = require('../webpack.config.base.js');
const profiles = require('../../profiles');

const env = process.env.NODE_ENV;
const envConfig = profiles[env];

Object.keys(baseWebpackConfig.entry).forEach(name =>
    baseWebpackConfig.entry[name] = ['./build/dev/client'].concat(baseWebpackConfig.entry[name])
);

module.exports = merge(baseWebpackConfig, {

    mode: 'development',

    devtool: 'eval-cheap-source-map',

    experiments: {
        lazyCompilation: {
            entries: false,
            imports: true
        }
    },

    plugins: [

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env),
            'process.env.IS_HOT_RELOAD': !!(envConfig.isHotReload)
        }),

        new webpack.HotModuleReplacementPlugin(),

        new HtmlPlugin({
            filename: 'index.html',
            template: './src/index.html',
            inject: true,
            NODE_ENV: env
        }),

        new ReactRefreshWebpackPlugin()

    ]

});
