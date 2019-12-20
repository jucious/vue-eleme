<template>
  <div>
    <header-top signin-up="true">
        <template v-slot:logo>
            <span class="fl">ele.me</span>
        </template>
    </header-top>
    <nav class="city-nav">
        <div class="city-tips">
          <span>当前定位城市：</span>
          <span>定位不准时，请在城市列表中选择</span>
        </div>
        <router-link :to="'/city/'+guesscity.id" class="guess-city">
          <span>{{guesscity.name}}</span>
          <i class="iconfont">&#xe603;</i>
        </router-link>
    </nav>
    <section class="hot-city">
        <span class="city_title">热门城市</span>
          <ul>
            <router-link tag="li" v-for="item in hotcity" :to="'/city/'+item.id" :key="item.id">
              {{item.name}}
            </router-link>
          </ul>
    </section>
    <section class="group-city">
        <div v-for="(items,keys,index) in sortGroupCity">
            <span class="city_title">
              {{ keys }}
              <span v-if="index==0">
                  （按字母排序）
              </span>
            </span>
            <ul>
              <router-link tag="li" :to="'/city/'+item.id" v-for="item in items">
                {{item.name}}
              </router-link>
            </ul>
        </div>
    </section>
  </div>
</template>

<script>
  import headerTop from '../../common/headerTop/headerTop'
  import { guessCityApi,hotCityApi,groupCityApi } from '../../../request/api'
  export default {
    name:'',
    props:[''],
    data () {
      return {
        guesscity:'',
        hotcity:[],
        groupcity:[]
      };
    },

    components: {
        headerTop
    },

    computed: {
      sortGroupCity(){
          const cityKeys = Object.keys(this.groupcity).sort();
          let sortData = {};
          for(let i of cityKeys.values()){
            sortData[i] = this.groupcity[i]
          }
          return sortData;
      }
    },

    beforeMount() {},
    mounted() {
      this.getGuessCity();
      this.getHotCity();
      this.getGroupCity();
    },
    methods: {
      getGuessCity(){
          guessCityApi().then(res => {
            this.guesscity = res.data;
          })
      },
      getHotCity(){
          hotCityApi().then(res => {
            this.hotcity = res.data;
          })
      },
      getGroupCity(){
          groupCityApi().then(res => {
            this.groupcity = res.data;
          })
      },
    },
    watch: {}

  }

</script>
<style lang='scss' scoped>
  @import '../../../style/mixin.scss';
  .city-nav{
    background: $white;
    padding-top: 2rem;
    margin-bottom: .6rem;
    .city-tips{
      border-bottom: 1px solid #dedede;
      span{
        font-size: .5rem;
      }
      span:nth-of-type(2){
        @include sc(.45rem,#9f9f9f);
        font-weight: bold;
      }
    }
    .arrow_right{
      @include wh(.6rem,.6rem);
      fill: #666;
    }
    .city-tips,.guess-city{
      display: flex;
      justify-content: space-between;
      line-height: 1.45rem;
      padding:.2rem $padding; 
      .iconfont{
        font-size: 1rem;
      }
    }
    .guess-city{
      box-shadow: 1px 1px 3px #dcdcdc;
      span{
        color:$blue;
      }
    }
  }
  .city_title{
        display: block;
        background-color: #fff;
        padding:.4rem $padding;
        border-bottom: 1px solid #dedede;
        span{
          color:#999;
        }
  }
  .hot-city ul,.group-city ul{
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;
    margin-bottom: 0.6em;
    li{
      width: 25%;
      color:$blue;
      line-height: 1.5rem;
      height: 1.5rem;
      overflow: hidden;
      white-space:nowrap;
      text-overflow: ellipsis;
      padding:0 .3rem;
      text-align: center;
      border-bottom:1px solid #dedede;
      border-right:1px solid #dedede;
      &:nth-of-type(4n){
        border-right: none; 
      }
    }
  }
  .group-city ul li{
    color: #666;
  }
</style>