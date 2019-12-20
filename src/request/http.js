const axios = require('axios')
const request = function (url,type,params){
    return axios({
        baseURL:'https://elm.cangdu.org',
        url:url,
        method:type,
        params:params
    })
}
export default request