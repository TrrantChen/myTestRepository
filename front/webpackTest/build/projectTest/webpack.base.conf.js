const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const output_path =  path.resolve(__dirname, '../../htdocs');

module.exports = {
    entry: {
        project1: './src/project_test/project1.js',
        project2: './src/project_test/project2.js',
    },
    output: {
        filename: '[name].[hash].js',
        path: output_path,
        publicPath: "/assets/", // 应该算是一个公共的目录之类的，加在127.0.0.1:8080/asssets/这个位置
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'project.html',
            template: path.resolve(__dirname, '../../src/template.html'),
            inject: true,
        })
    ],
};


