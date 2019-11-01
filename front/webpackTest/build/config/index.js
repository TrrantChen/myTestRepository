const { resolve } = require('../util');

module.exports = {
    common: {
        assetsRoot: resolve('../htdocs'),
        assetsSubDirectory: 'assets',
        assetsPublicPath: '/test_project/',
    },
    dev: {
        // Paths
        // assetsSubDirectory: 'static',
        // assetsPublicPath: '/test_project/',
    },
    build: {
        // Paths
    }
};
