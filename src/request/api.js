import request from './http'
const guessCityApi = ()=>{ return request('/v1/cities','Get',{type:'guess'}) }
const hotCityApi = ()=>{ return request('/v1/cities','Get',{type:'hot'}) }
const groupCityApi = ()=>{ return request('/v1/cities','Get',{type:'group'}) }
const cityInfoApi = (id)=>{return request('/v1/cities/'+id,'Get')}
const addSearchApi = (params)=>{return request('/v1/pois','Get',params)}
const poisApi = (geohash)=>{return request('/v2/pois/'+geohash,'Get')}
const foodCateApi = ()=>{return request('/v2/index_entry','Get')}
const shoppingApi = (params)=>{return request('/shopping/restaurants','Get',params)}
const shopCategory = (params)=>{return request('shopping/v2/restaurant/category','Get',params)}
const deliveryMode = (params)=>{return request('/shopping/v1/restaurants/delivery_modes','Get',params)}
const activityApi = (params)=>{return request('shopping/v1/restaurants/activity_attributes','Get',params)}
export { 
    guessCityApi,
    hotCityApi,
    groupCityApi,
    cityInfoApi,
    addSearchApi,
    poisApi,
    foodCateApi,
    shoppingApi,
    shopCategory,
    deliveryMode,
    activityApi
}