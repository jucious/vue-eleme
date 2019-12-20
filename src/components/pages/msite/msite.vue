<template>
    <div>
        <headerTop signin-up="true">
            <template #msiteTitle>
                <router-link class="title" to="/home" tag="h5">
                    {{title}}
                </router-link>
            </template>
            <template #search>
                <router-link class="search" to="/search">
                    <i class="iconfont">&#xe610;</i>
                </router-link>
            </template>    
        </headerTop>
        <section>
            <swiper ref="mySwiper"  :options="swiperOption" >
                <swiper-slide v-for="(items,index) in foodType" :key="index">
                    <div v-for="(item,index) in items" :key="index" class="foodType-item">
                        <router-link :to="{path:'/food/',query:{geohash:geohash,title:item.title,restaurant_category_id:item.id}}">
                            <img :src="'https://fuss10.elemecdn.com'+item.image_url" alt="">
                            <span>{{item.title}}</span>
                        </router-link>
                    </div>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper> 
        </section>
        <h5 class="shop-title">
            <i class="iconfont">
                &#xe6bd;
            </i>
            附近商家
        </h5>
        <shop-list></shop-list>
    </div>
</template>

<script>
    import headerTop from '../../common/headerTop/headerTop';
    import shopList from '../../common/shopList/shopList';
    import {poisApi,foodCateApi,guessCityApi } from '../../../request/api';
    import { swiper, swiperSlide } from 'vue-awesome-swiper';
    import {mapMutations} from 'vuex'
    export default {
        name:'',
        props:[''],
        data () {
            return {
                title:'',
                foodType:[],
                swiperOption:{
                    pagination:{
                        el:'.swiper-pagination'
                    }
                },
                geohash:''
            };
        },

        components: {
            headerTop,
            swiper,
            swiperSlide,
            shopList
        },

        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper
            }
        },

        async beforeMount() {
            this.geohash = this.$route.query.geohash;
            if(!this.geohash){
                await guessCityApi(res=>{
                    this.geohash = res.data.latitude+','+res.data.longitude;
                })
            }
            this.SAVE_GEOHASH(this.geohash);
            this.RECORD_ADDRESS(this.geohash)
        },

        mounted() {
            this.getPois();
            this.getFoodCate();
           
        },

        methods: {
            getPois(){
                poisApi(this.geohash).then(res=>{
                   this.title = res.data.name
                })
            },
            getFoodCate(){
                foodCateApi().then(res=>{
                    let arr=[];
                    for(let i=0,j=0;i<res.data.length;i+8,j++){
                       arr[j] = res.data.splice(0,8)
                    }
                    this.foodType = arr;
                })
            },
            ...mapMutations([
                'SAVE_GEOHASH',
                'RECORD_ADDRESS'
            ])
            
        },

        watch: {}

    }

</script>
<style lang='scss' scoped>
    @import '../../../style/mixin.scss';
    .title{
        text-align: center;
        width: 50%;
        position: absolute;
        left: 50%;
        top: 0;
        margin-left: -25%;
        @include testeps;
        font-size: .7rem;
        color: #ffffff;
    }
    .search{
        position: absolute;
        left: 0.5rem;top: 0;
        .iconfont{
            color: #ffffff;
            font-size: .8rem;
        }
    }
    .swiper-slide{
        display: flex;
        flex-wrap: wrap;
        padding: 2.5rem 0 1.5rem;
        background-color: #fff;
        border-bottom: 1px solid#e4e4e4;
        .foodType-item{
            width: 25%;
            text-align: center;
            margin-bottom: 0.6rem;
            img{
                width:40%;
            }
            span{
                display: block;
                color: #666;
            }
        }
    }
    .shop-title{
        margin-top: 0.5rem;
        padding:.5rem .4rem 1rem;
        border-top: 1px solid#e4e4e4;
        background-color: #fff;
    }
</style>