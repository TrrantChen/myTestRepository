const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { resolve } = require('../util.js');
const { assetsPath } = require('../tool.js');
const config = require('../config');
const baseWebpackConfig = require('./webpack.base.conf');

const prodWebpackConfig = {
    mode: 'production',
    output: {
        path: config.build.assetsRoot,
        filename: assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: assetsPath('js/[id].[chunkhash].js')
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[id].css',
        }),
        new CopyWebpackPlugin([
            {
                from: resolve('../assets'),
                to: config.dev.assetsSubDirectory,
                ignore: ['.*']
            }
        ])
    ],
};

module.exports = merge(baseWebpackConfig, prodWebpackConfig);
