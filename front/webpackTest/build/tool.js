const path = require('path');
const config = require('./config');

function assetsPath(_path) {
    const assetsSubDirectory = config.common.assetsSubDirectory;
    return path.posix.join(assetsSubDirectory, _path)
}

module.exports = {
    assetsPath
};
