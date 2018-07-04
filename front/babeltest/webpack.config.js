const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
    entry:  ['./app/index.js', ],
    // entry: {
    //     'babel-polyfill': ['babel-polyfill'],
    //     main: './app/index.js',
    // },
    output: {
        path: path.resolve(__dirname, 'build'), // 必须使用绝对地址，输出文件夹
        filename: "bundle.js", // 打包后输出文件的文件名
        publicPath: 'build/' // 打包后的文件夹
    },
    module: {
        rules: [{
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
        ]
    },
}