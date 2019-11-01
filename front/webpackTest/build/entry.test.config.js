const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const config = require('./config');

let chunks = ['test1', 'test2'].map((name) => {
    return new HtmlWebpackPlugin({
        filename: `${name}.html`,
        template: path.resolve(__dirname, '../src/template.html'),
        inject: true,
        chunks: name,
        // chunks: [name,'vendors'] // vendors作用不明
    })
});

console.log(process.env.NODE_ENV);

module.exports = {
    mode: 'production',
    entry: {
        file1: './src/entry_test/file1.js',
        file2: './src/entry_test/file2.js',
    },
    output: {
        filename: '[name].[hash].js',                 // 动态生成hash
        path: config.build.assetsRoot,
    },
    plugins: [
        new CleanWebpackPlugin(),  // 用于清空htdocs目录
        ...chunks
    ],
};


