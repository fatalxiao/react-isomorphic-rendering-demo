/**
 * @file profiles.js
 */

module.exports = {

    development: {
        port: '5010',
        isHotReload: true,
        proxyTable: {
            '/foo-bar': 'https://foo.bar'
        }
    },

    testing: {
        port: '8000',
        proxyTable: {
            '/foo-bar': 'https://foo.bar'
        }
    },

    production: {
        port: '8000',
        proxyTable: {
            '/foo-bar': 'https://foo.bar'
        }
    }

};
