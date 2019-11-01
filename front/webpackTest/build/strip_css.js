const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('./config');
const { resolve } = require('./util');

module.exports = {
    mode: 'production',
    entry: {
        test: './src/strip_css/test.js',
    },
    output: {
        filename: '[name].[hash].js',                 // 动态生成hash
        path: config.build.assetsRoot,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: config.build.assetsRoot,
                        },
                    },
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
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),  // 用于清空htdocs目录
        new HtmlWebpackPlugin({
            filename: `index.html`,
            template: resolve('../src/template.html'),
            inject: true,
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[id].css',
        })
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
