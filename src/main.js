import Vue from 'vue'
import style from '../src/style/common.scss'
import rem from './config/rem'
import router from '../src/router/router'
import swiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import store from '../src/store/'
Vue.config.devtools = true
Vue.use(swiper)
new Vue({
    router,
    store
}).$mount('#app')

