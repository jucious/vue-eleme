const webpack = require('webpack')
module.exports = {
    devtool: 'inline-source-map',
    devServer:{
        port:3002
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env':  JSON.stringify(process.env.NODE_ENV)
        })
    ]
}