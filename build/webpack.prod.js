const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
    devtool: 'source-map',
    optimization:{
        splitChunks:{
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
            
        }
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env':  JSON.stringify(process.env.NODE_ENV)
        }),
        new MiniCssExtractPlugin ({
            filename:'/static/[name].css'
        })
    ]
}