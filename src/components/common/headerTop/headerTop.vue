<template>
  <div class="header clear">
      <div class="goback-icon" v-if="goBack" @click="$router.go(-1)">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
        </svg>
      </div>
      <div class="header-title" v-if="headerTitle">
          {{headerTitle}}
      </div>
      <section>
        <slot name="logo"></slot>
        <slot name="changecity"></slot>
        <slot name="msiteTitle"></slot>
        <slot name="search"></slot>
        <router-link to='/login' class="user" v-if="signinUp">
          <span v-show="!islogin">登录|注册</span>
          <span v-show="islogin">个人中心</span>
        </router-link>
      </section>

  </div>
</template>
<script>
  export default {
    name:'headTop',
    props:['signinUp','goBack','headerTitle'],
    data () {
      return {
        islogin:false
      };
    },
    components: {},
    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {},

    watch: {}

  }

</script>
<style lang='scss' scoped>
  @import '../../../style/mixin.scss';
  .header{
    background-color:$blue;
    height: 1.8rem;
    width: 100%;
    padding:0 $padding;
    line-height: 1.8rem;
    position: fixed;
    top: 0;
    color: #ffffff;
    z-index: 99;
    .user{
      position: absolute;
      right: 0.5rem;
      top: 0;
    }
    span{
      @include sc(.6rem,#ffffff)
    }
    .goback-icon{
      @include wh(.6rem,1rem);
      position: absolute;
      top:.4rem;
      left:.5rem
    }
    .header-title{
      @include sc(.8rem,#ffffff);
      font-weight: bold;
      text-align: center;
    }
  }
</style>