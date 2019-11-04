const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const config = require('./config');
const { resolve } = require('./util');

module.exports = {
    mode: 'production',
    entry: {
        test: './src/snabbdom_test/test.js',
    },
    devServer: {
        compress: true,
        port: 8080,
        inline: true,
        hot: true,
        publicPath:  config.common.assetsPublicPath, // 这里的值最好跟output.publicPath上的值保持一致。
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
    output: {
        filename: '[name].[hash].js',                 // 动态生成hash
        path: config.build.assetsRoot,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
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
            template: resolve('../src/snabbdom_test.html'),
            inject: true,
        }),
        new webpack.HotModuleReplacementPlugin(),
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
