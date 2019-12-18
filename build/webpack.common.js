const path = require('path')
const config = require('../config/index')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const html = require('html-withimg-loader')
const merge = require('webpack-merge')
const devConf = require('./webpack.dev')
const prodConf = require('./webpack.prod')
const env = process.env.NODE_ENV

const commonConf = {
    entry: {
        app:'./src/main.js',
    },
    output:{
        path:path.resolve(__dirname,'../dist'),
        publicPath: env==='production'?config.build.assetPublicPath:config.dev.assetPublicPath,
        filename:'[name].js'
    },
    resolve:{
        alias:{
            'vue$':'vue/dist/vue.esm.js',
            'src': path.resolve(__dirname, '../src'),
        },
        extensions:['.vue','.js','.scss']
    },
    module: {
        rules: [{
          test: /\.css$/,
          use: [
            'vue-style-loader',
            'css-loader'
            ]
            },{
                test: /\.scss$/,
                use: [
                process.env.NODE_ENV !== 'production'? 'vue-style-loader': MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader'
                ]
            },
            {
                test: /\.sass$/,
                use: [
                'vue-style-loader',
                'css-loader',
                'sass-loader?indentedSyntax'
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },{
                test: /\.js$/,
                loader: 'babel-loader'
            },{
                test: /\.(htm|html)$/i,
                loader: 'html-withimg-loader'
            },{
                test: /\.(png|jpg|gif|svg|woff|eot|ttf)$/,
                loader: 'file-loader',
                options: {
                    name: 'static/[name].[ext]'
                }
            }]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'index.html',
            inject:true
        }),
        new CleanWebpackPlugin()
    ]
}
module.exports = env => {
    let config = process.env.NODE_ENV==='production'?prodConf:devConf;
    return merge(commonConf,config)
}