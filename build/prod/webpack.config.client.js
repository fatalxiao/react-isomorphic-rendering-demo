/**
 * @file webpack.config.client.js
 */

// Statics
const config = require('../config.js');
const baseWebpackConfig = require('../webpack.config.base.js');

// Vendors
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const {resolveRootPath, getAssetsSubPath, getAssetsVendorsAbsolutePath} = require('../utils.js');

const env = process.env.NODE_ENV;
const vendorsAssets = require(getAssetsVendorsAbsolutePath('vendors-assets.json', env));
const prodConfig = {

    mode: 'production',

    devtool: false,

    entry: {
        app: './client/index.js'
    },

    output: {
        path: config.assetsRoot,
        filename: getAssetsSubPath('js/[name].[chunkhash].js', env),
        chunkFilename: getAssetsSubPath('js/[id].[chunkhash].js', env)
    },

    optimization: {
        runtimeChunk: {
            name: 'runtime'
        }
    },

    plugins: [

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env)
        }),

        new CopyPlugin({
            patterns: [{
                from: resolveRootPath('static'),
                to: config.assetsSubDirectory
            }]
        }),

        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require(getAssetsVendorsAbsolutePath('polyfill-manifest.json', env))
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require(getAssetsVendorsAbsolutePath('moment-manifest.json', env))
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require(getAssetsVendorsAbsolutePath('react-manifest.json', env))
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require(getAssetsVendorsAbsolutePath('tools-manifest.json', env))
        }),

        new HtmlPlugin({
            filename: config.index,
            template: './src/index.html',
            favicon: './src/assets/icons/favicon.ico',
            inject: true,
            NODE_ENV: env,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),

        new HtmlWebpackTagsPlugin({
            tags: [
                vendorsAssets['polyfill'].js,
                vendorsAssets['moment'].js,
                vendorsAssets['react'].js,
                vendorsAssets['tools'].js
            ],
            append: false
        }),

        new CompressionPlugin({
            test: new RegExp('\\.(' + config.productionGzipExtensions.join('|') + ')$'),
            filename: '[path][base].gz[query]'
        })

    ]

};

if (env === 'analyzer') {
    prodConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = merge(baseWebpackConfig, prodConfig);
