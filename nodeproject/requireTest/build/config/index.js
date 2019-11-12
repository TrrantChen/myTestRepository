const { resolve } = require('../util');
// console.log(__dirname);
console.log('===============config===============');
// console.log(resolve);

module.exports = {
    common: {
        assetsRoot: resolve('../htdocs'),
        assetsSubDirectory: 'assets',
        assetsPublicPath: '/test_project/',
    },
};
