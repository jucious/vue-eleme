<template>
    <div class="food-container">
        <header-top goBack='true' :headerTitle="title">
            
        </header-top>
        <section class="sort-container">
            <div class="sort-item" >
                <span class="sort-nav" :class="{active:type==1}" @click="chooseType(1)">
                    {{categoryTitle}}
                    <i class="iconfont arrow">&#xe607;</i>
                </span>
                <transition name="fade">
                    <div class="sort-detail-type" v-show="type==1">
                        <div class="sort-detai-lt">
                            <ul>
                                <li v-for="(item,index) in category" :key="index" @click="selectCategory(index)" :class="{active:activeIndex==index}">
                                    <div>
                                        <img :src="getImgPath(item.image_url)" alt="">
                                        <span>{{item.name}}</span>
                                    </div>  
                                    <div> 
                                        <span class="count">
                                            {{item.count}}
                                        </span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="sort-detai-rt">
                        <ul>
                                <li v-for="(item,index) in subCategory" :key="index" v-show="index!=0">
                                    <div>
                                        <span>{{item.name}}</span>
                                    </div>
                                    <div>
                                        <span class="count">{{item.count}}</span>
                                    </div>
                                </li>
                        </ul>
                        </div>
                    </div>
                </transition>
            </div>
            <div class="sort-item">
                <span class="sort-nav":class="{active:type==2}" @click="chooseType(2)">
                    排序
                    <i class="iconfont arrow">&#xe607;</i>
                </span>
                <transition name="fade">
                    <div class="sort-detail-type" v-show="type==2">
                        <ul>
                            <li class="sort_list_li">
                                <i class="iconfont" style="color:#3190e8">&#xe66c;</i>
                                <span>智能排序</span>
                            </li>
                            <li class="sort_list_li">
                                <i class="iconfont" style="color:#f19452">&#xe672;</i>
                                <span>距离最近</span>
                            </li>
                            <li class="sort_list_li">
                                <i class="iconfont" style="color:#ff1616">&#xe648;</i>
                                <span>销量最高</span>
                            </li>
                            <li class="sort_list_li">
                                <i class="iconfont" style="color:#ff8216">&#xe662;</i>
                                <span>起送价最低</span>
                            </li>
                            <li class="sort_list_li">
                                <i class="iconfont" style="color:#3190e8">&#xe616;</i>
                                <span>配送速度最快</span>
                            </li>
                            <li class="sort_list_li">
                                <i class="iconfont" style="color:#ff8216">&#xe640;</i>
                                <span>评分最高</span>
                            </li>
                        </ul>
                    </div>
                </transition>
            </div>
            <div class="sort-item" >
                <span class="sort-nav" :class="{active:type==3}" @click="chooseType(3)">
                    筛选
                    <i class="iconfont arrow">&#xe607;</i>
                </span>
                <transition name="fade">
                    <div class="sort-detail-type filter_container" v-show="type==3">
                        <div class="deliver-type">
                            <div class="filter-title">配送方式</div>
                            <div class="filter-ul">
                                <li v-for="item in foodDelivery">
                                    {{item.text}}
                                </li>
                            </div>
                        </div>
                        <div class="activity">
                            <div class="filter-title">商家属性（可以多选）</div>
                            <ul class="filter-ul">
                                <li v-for="item in foodActivity">
                                    {{item.name}}
                                </li>
                            </ul>
                        </div>

                    </div>
                </transition>
            </div>
        </section>
        <transition name="fade">
            <div class="back_cover" v-show="type"></div>
        </transition>
        <shop-list></shop-list>
    </div>
</template>

<script>
import headerTop from '../../common/headerTop/headerTop';
import shopList from '../../common/shopList/shopList';
import {shopCategory,deliveryMode,activityApi} from '../../../request/api';
import {getImgPath} from '../../common/mixin'
import {mapState,mapMutations} from 'vuex'
export default {
    name:'',
    props:[''],
    data () {
        return {
            categoryTitle:'分类',
            category:'',
            subCategory:'',
            activeIndex:0,
            type:'',
            foodDelivery:null,
            foodActivity:null
        };
    },

    components: {
        headerTop,
        shopList
    },

    computed: {
        ...mapState(['latitude','longitude'])
    },
    created(){
        this.initData();
    },
    beforeMount() {
       
    },
    mounted() {
        
    },
    mixins:[getImgPath],
    methods: {
        ...mapMutations(['RECORD_ADDRESS']),
        async initData(){ 
            this.title = this.$route.query.title;
            this.geohash = this.$route.query.geohash;
            this.RECORD_ADDRESS(this.geohash);
            this.category = await shopCategory(this.latitude,this.longitude).then(res=>{
                return res.data
            });
            this.subCategory = this.category[this.activeIndex].sub_categories;
            this.foodDelivery = await deliveryMode(this.latitude,this.longitude).then(res=>{
                return res.data
            });
            this.foodActivity = await activityApi(this.latitude,this.longitude).then(res=>{
                return res.data
            });
        },
        selectCategory(index){
            this.activeIndex = index;
            this.subCategory = this.category[index].sub_categories;
        },
        chooseType(type){
            this.type = (type==this.type)?'':type;
        }
    },

    watch: {}

}

</script>
<style lang='scss' scoped>
    @import '../../../style/mixin.scss';
    .food-container{
        padding-top: 4rem;
        background-color: #fff;
    }
    .back_cover{
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 10;
    }
    .sort-container{
        position:fixed;
        top: 1.8rem;
        left:0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        background-color: #ffffff;
        border-bottom: 1px solid #eeeeee;
        z-index: 99;
        .sort-item{
            flex: 1;
            height: 1.6rem;
            text-align: center;
            line-height: 1.6rem;
            .sort-nav.active,.sort-nav.active .arrow{ 
                color: $blue;
            }
            .sort-nav.active .arrow{
                transform: rotate(180deg);
            }
            .arrow{
                display: inline-block;
                color: #444;
                font-size: .4rem;
                
            }
        }
        
    }
    
    .fade-enter-active,.fade-leave-active{
        transition: all .3s;
    }
    .fade-enter,.fade-leave-active{
        opacity: 0;
    }
    .sort-detail-type{
        background-color: #fff;
        width: 100%;
        position: absolute;
        top: 1.6rem;
        padding-bottom: .5rem;
        left: 0;
        display: flex;
        border-top: 1px solid #eeee;
        &>div{
            width: 50%;
            height: 100%;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            &.sort-detai-lt{
                background-color: #f5f5f5;
            }
        }
        
        li{
            text-align: left;
            display: flex;
            justify-content: space-between;
            padding: .2rem .5rem .2rem .6rem;
            &.active{
                background-color: #fff;
            }
        }
        .sort_list_li{
            display: block;
            .iconfont{
                width: 0.6rem;
                height: .6rem;
                font-size: .65rem;
                margin-right: .2rem;
            }
        }
        .sort-detai-rt{
            li{
                border-bottom: 1px solid #eee;
            }
        }
        .count{
            font-size: .4rem;
            padding: 0 .2rem;
            border: 1px solid #dddddd;
            color: #999;
            border-radius: 1rem;  
            display: inline-block;
            width: 1.8rem;
            line-height: .7rem;
            text-align: center;
        }
        img{
            width: .8rem;
            height: .8rem;
            margin-right: 0.3rem;
        }
    }
    .filter_container {
        display: block;
         padding: 0 .5rem .5rem;
        &>div{
            width: 100%;
            text-align: left;
        }
        .filter-ul{
            display: flex;
            justify-content: space-between;
            flex-flow: wrap;
            li{
                border:1px solid #eee;
                width: 30%;
                height: 1.2rem;
                line-height: 1.2rem;
                padding: 0;
                text-align: center;
                margin-bottom: 0.5rem;
                display: block;
            }
        }
    }


</style>