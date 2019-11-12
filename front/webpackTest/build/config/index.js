const{ resolve } = require('../util');

module.exports = {
    common: {
        assetsRoot: resolve('../htdocs'),
        assetsSubDirectory: 'assets',
        assetsPublicPath: '/static_test/',
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

