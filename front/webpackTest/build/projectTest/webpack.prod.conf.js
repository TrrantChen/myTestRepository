const webpack = require('webpack')
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const prodWebpackConfig = {
    mode: 'production',
};

module.exports = merge(baseWebpackConfig, prodWebpackConfig);
