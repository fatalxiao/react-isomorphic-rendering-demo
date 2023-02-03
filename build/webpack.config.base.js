/**
 * @file webpack.config.base.js
 */

// Statics
const config = require('./config.js');

// Vendors
const {resolveRootPath} = require('./utils.js');

const cssLoaderConfig = ['style-loader', {
    loader: 'css-loader',
    options: {
        importLoaders: 1
    }
}, {
    loader: 'postcss-loader',
    options: {
        postcssOptions: {
            plugins: [
                'postcss-preset-env'
            ]
        }
    }
}];

module.exports = {

    entry: {
        app: './src/index.js'
    },

    output: {
        path: config.assetsRoot,
        filename: '[name].js',
        publicPath: config.assetsPublicPath
    },

    resolve: {
        extensions: ['.js', '.scss'],
        fallback: {
            'crypto': false
        },
        alias: {
            'src': resolveRootPath('src'),
            'modules': resolveRootPath('src/modules')
        }
    },

    module: {
        rules: [{
            test: /\.m?js$/,
            use: {
                loader: 'babel-loader'
            },
            exclude: /node_modules/
            // include: resolveRootPath('src')
        }, {
            test: /\.(png|jpe?g|gif|svg|cur|ico)(\?.*)?$/,
            type: 'asset/resource',
            generator: {
                filename: 'img/[name]-[contenthash:8][ext]'
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            type: 'asset/resource',
            generator: {
                filename: 'font/[name]-[contenthash:8][ext]'
            }
        }, {
            test: /\.scss$/,
            use: [...cssLoaderConfig, {
                loader: 'sass-loader',
                options: {
                    sassOptions: {
                        includePaths: [resolveRootPath('src/assets')]
                    }
                }
            }]
        }, {
            test: /\.css$/,
            use: cssLoaderConfig
        }]
    }

};
