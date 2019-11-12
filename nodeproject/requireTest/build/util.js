const config = require('./config');
const path = require('path');

console.log('===============util===============')

function resolve (dir) {
    return path.join(__dirname,  dir)
}

function assetsPath(_path) {
    // const assetsSubDirectory = config.common.assetsSubDirectory;
    // return path.posix.join(assetsSubDirectory, _path)
}

module.exports = {
    resolve,
    assetsPath,
};
