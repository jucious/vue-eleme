<template>
  <div class="container">
    <header-top goBack="true" :headerTitle="cityName">
        <template #changecity>
          <router-link to="/home" class="change-city"> 切换城市 </router-link>
        </template>
    </header-top>
      <form action="" class="search-form">
        <input type="search" class="search-input" v-model="seachKey" placeholder="请输入学校、商务楼、地址">
        <input type="button" value="提交" class="submit-btn" @click="searchHandle"> 
      </form>
      <div class="address-list">
        <ul>
            <router-link  tag='li' v-for="item in searchList" :to="{ path: '/msite', query: { geohash: item.geohash }}">
              <h4>{{item.name}}</h4>
              <p>{{item.address}}</p>
            </router-link>
        </ul>
      </div>
      <div class="none-search" v-if="searchNone">
        很抱歉，无搜索结果
      </div>
  </div>
</template>

<script>
  import headerTop from '../../common/headerTop/headerTop'
  import {cityInfoApi,addSearchApi} from '../../../request/api'
  export default {
    name:'',
    props:[''],
    data () {
      return {
          cityId:'',
          cityName:'',
          seachKey:'',
          searchNone:false,
          searchList:{}
      };
    },

    components: {
      headerTop
    },

    computed: {},

    beforeMount() {},

    mounted() {
      this.cityId = this.$route.params.id;
      this.GetCityInfo();
    },

    methods: {
      GetCityInfo(){
        cityInfoApi(this.cityId).then(res=>{
            this.cityName = res.data.name;
        })
      },
      searchHandle(){
           let params = {city_id:this.cityId,keyword:this.seachKey};
           addSearchApi(params).then(res=>{
             this.searchList = res.data;
             console.log(res.data.length)
             this.searchNone = res.data.length>0?false:true;
           });
      }
    },

    watch: {}

  }

</script>
<style lang='scss' scoped>
  @import '../../../style/mixin.scss';
  .change-city{
    position: absolute;
    top:0;
    right: 0.5rem;
    line-height: 1.8rem;
    @include sc(.6rem,#ffffff)
  }
  .search-form{
    background-color: #fff;
    margin-top: 2.4rem;
    padding: 5%;
    border-bottom:1px solid #dedede;
    input{
      width: 100%;
      height: 1.5rem;
      &.submit-btn{
        background-color:$blue;
        color: #fff;
      }
      &.search-input{
        border:1px solid #dddddd;
        margin-bottom: 0.5rem;
        padding:0 .5rem;
      }
    }
  }
  .address-list{
    background-color: #fff;
    li{
      padding:.5rem 5%;
      border-bottom:1px solid #dedede;
    }
  }
  .none-search{
    padding:.5rem 5%;
    background-color: #fff;
  }
</style>