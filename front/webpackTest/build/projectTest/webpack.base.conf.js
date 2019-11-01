const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const output_path =  path.resolve(__dirname, '../../htdocs');
const { resolve } = require('../../util.js');

console.log('===================================');
console.log(resolve('src/directive'));

module.exports = {
    entry: {
        project1: './src/project_test/project1.js',
        project2: './src/project_test/project2.js',
        // project1: path.resolve(__dirname, '../../src/project_test/project1.js'),
        // project2: path.resolve(__dirname, '../../src/project_test/project2.js'),
    },
    output: {
        filename: '[name].[hash].js',
        path: output_path,
        publicPath: '/assets/', // 应该算是一个公共的目录之类的，加在127.0.0.1:8080/asssets/这个位置
    },
    plugins: [
        new CleanWebpackPlugin(), // 用于清空htdocs目录
        new HtmlWebpackPlugin({ // 这种配置只能用于单个html文件
            filename: 'project.html',
            template: path.resolve(__dirname, '../../src/template.html'),
            inject: true,
        })
    ],
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        modules : ["../../src", "../../test_resolve", "node_modules/"],
        alias: {
            'vue$': 'vue/dist/vue.esm.js', // $表示精确匹配
            '@': resolve('src'),
            'directive': resolve('src/directive'),
        }
    }
};


