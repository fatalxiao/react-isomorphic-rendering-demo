/**
 * @file .babelrc.js
 */

const presets = [
    [
        '@babel/preset-env',
        {
            modules: false,
            useBuiltIns: 'usage',
            corejs: 3,
            targets: {
                'safari': '7',
                'ie': '11'
            }
        }
    ],
    '@babel/preset-react'
];

const commonPlugins = [
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-do-expressions',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-function-bind',
    '@babel/plugin-proposal-function-sent',
    '@babel/plugin-proposal-json-strings',
    '@babel/plugin-proposal-logical-assignment-operators',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-proposal-optional-chaining',
    ['@babel/plugin-proposal-pipeline-operator', {proposal: 'minimal'}],
    '@babel/plugin-proposal-throw-expressions',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-meta',
    '@babel/plugin-transform-runtime'
];

const packageConfig = {
    presets,
    plugins: [
        ...commonPlugins,
        ['transform-react-remove-prop-types', {removeImport: true}]
    ]
};

module.exports = {
    'env': {

        'development': {
            presets,
            plugins: [
                ...commonPlugins,
                'transform-import-sync',
                ['react-refresh/babel', {skipEnvCheck: true}]
            ]
        },

        'test': {
            'presets': [
                '@babel/preset-env',
                '@babel/preset-react'
            ],
            'plugins': [
                ['babel-plugin-webpack-aliases', {'config': './build/webpack.config.base.js'}]
            ]
        },

        'analyzer': packageConfig,

        'testing': packageConfig,

        'production': packageConfig

    }
};
