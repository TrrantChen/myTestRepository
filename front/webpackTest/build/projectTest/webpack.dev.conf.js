const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

const devWebpackConfig = {
    mode: 'development',
    devServer: {
        compress: true,
        port: 8080,
        inline: true,
        hot: true,
        publicPath: "/assets/", // 这里的值最好跟output.publicPath上的值保持一致。
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
};

module.exports = merge(baseWebpackConfig, devWebpackConfig);
