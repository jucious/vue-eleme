import VueRouter from 'vue-router'
import Vue  from 'vue'
import home from '../components/pages/home/home.vue'
import city from '../components/pages/city/city.vue'
import login from '../components/pages/login/login.vue'
import msite from '../components/pages/msite/msite.vue'
import search from '../components/pages/search/search.vue'
import food from '../components/pages/food/food.vue'
Vue.use(VueRouter)
export default new VueRouter({
    routes: [
        {path:'/', redirect:'/home'},
        {path: '/home', component: home},
        {path:'/login', component: login},
        {path:'/city/:id', component: city},
        {path:'/msite',component:msite},
        {path:'/search',component:search},
        {path:'/food',component:food}
    ]
})
