const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const baseWebpackConfig = require('./webpack.base.conf');

const config = require('../config');
const { resolve } = require('../util.js');

process.env.NODE_ENV = 'development';

const devWebpackConfig = {
    mode: 'development',
    devServer: {
        compress: true,
        port: 8080,
        inline: true,
        hot: true,
        publicPath:  config.common.assetsPublicPath, // 这里的值最好跟output.publicPath上的值保持一致。
        // contentBase: resolve('../assets'),  // 使用这种方式，然后在html中 <img width="50" height="50" src="/ss.png" alt="img fail"> 也是可行的
        contentBase: false, // 但一般好像都是禁止的，使用CopyWebpackPlugin，我猜应该是为了线上和线下路径一致才这么做的。
        quiet: true, // 除了初始打印信息，其他的信息不会在控制台上打印，
        open: false,
        // openPage: false,
        overlay: {
            warnings: false,
            errors: true,
        }, // 开启错误全屏遮挡
        proxy: {}, // 代理项
        watchOptions: {
            ignored: /node_modules/, // 排除监控的文件夹
            aggregateTimeout: 300, //监听到变化发生后等300ms再去执行动作，防止文件更新太快导致编译频率太高
            poll: 1000, //通过不停的询问文件是否改变来判断文件是否发生变化，默认每秒询问1000次，或者可以设置为false
        },
        disableHostCheck: true, // 是否禁用检查hostname 直接使用localhost和127.0.0.1都可以正常访问，但是修改了host，使用hostname访问，就会显示invalid host header,需要改为true才行
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // 热更新的必要插件
        new CopyWebpackPlugin([
            {
                from: resolve('../assets'),
                to: config.common.assetsSubDirectory,
                ignore: ['.*']
            }
        ])
    ],
};

module.exports = merge(baseWebpackConfig, devWebpackConfig);
