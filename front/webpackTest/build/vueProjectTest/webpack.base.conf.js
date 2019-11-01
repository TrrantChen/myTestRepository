const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('../config');
const { resolve } = require('../util.js');

module.exports = {
    entry: {
        main: './src/vue_test/main.js',
    },
    output: {
        filename: '[name].[hash].js',
        path: config.common.assetsRoot,
        publicPath: config.common.assetsPublicPath, // 应该算是一个公共的目录之类的，加在127.0.0.1:8080/asssets/这个位置 这一项在build的时候会出问题
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    process.env.NODE_ENV === 'production'
                        ?
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: config.common.assetsRoot,
                            },
                        }
                        : 'vue-style-loader'   // 生产环境使用css提取，开发环境使用vue-style-loader进行热更新
                    ,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss', //说明options里面插件的使用是针对于谁的，我们这里是针对于postcss的
                            plugins: [ //这里的插件只是这对于postcss
                                require('autoprefixer')(), //引入添加前缀的插件,第二个空括号是将该插件执行
                                require('cssnano')(), // css压缩
                            ]
                        }
                    },
                ],
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: path.posix.join(config.common.assetsSubDirectory, '[name].[hash:7].[ext]'),
                        },
                    },
                ],
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(), // 用于清空htdocs目录
        new HtmlWebpackPlugin({ // 这种配置只能用于单个html文件
            filename: 'vueTest.html',
            template: resolve('../src/template.html'),
            inject: true,
        }),
    ],
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        modules : ["../../src", "../../test_resolve", "../../node_modules/"],
        alias: {
            'vue$': 'vue/dist/vue.esm.js', // $表示精确匹配
            '@': resolve('src'),
            'directive': resolve('src/directive'),
        }
    }
};


