const path = require('path')
module.exports = {
    build:{
        assetPublicPath:path.resolve(__dirname, '../dist')
    },
    dev:{
        assetPublicPath:'/'
    }
}