<template>
  <div>
    <section class="shop-wrap">
      <li v-for="item in shops" class="shop-item">
          <div class="shop-img">
              <img :src="'http://elm.cangdu.org/img/'+item.image_path" alt="">
          </div>
          <div class="shop-des">
              <h5 class="name">{{item.name}}</h5>
              <div class="clear shop-ct">
                  <div class="fl scale-s">
                    <span>
                        <i class="iconfont">&#xe632;</i>
                        <em class="rating">{{item.rating}}</em>
                    </span>
                    <span>月售{{item.recent_order_num}}单</span>
                  </div>
                  <div class="delivery_style fr scale-s scale-rt">
                    <span>{{item.delivery_mode.text}}</span>
                  </div>
              </div>
              <div class="clear order-wrap">
                <span class="scale-s">￥{{item.float_minimum_order_amount}}起送/{{item.piecewise_agent_fee.tips}}</span>
                <span class="scale-s scale-rt">{{item.distance}} <em class="order-time">/{{item.order_lead_time}}</em></span>
              </div>
          </div>
          
      </li>
      </section>
  </div>
</template>

<script>
  import {shoppingApi} from '../../../request/api';
  import {mapState} from 'vuex'
  export default {
    name:'',
    data () {
      return {
          shops:[]
      };
    },

    components: {},

    computed: {
      ...mapState([
        'latitude',
        'longitude'
      ])
    },

    beforeMount() {},

    mounted() {
       this.getshopping();
    },

    methods: {
      getshopping(){
          const params = {
              latitude:this.latitude,
              longitude:this.longitude
          }
          shoppingApi(params).then(res=>{
              this.shops = res.data;
          })
      }
    },

    watch: {}

  }

</script>
<style lang='scss' scoped>
  @import '../../../style/mixin.scss';
  .shop-wrap{
    background-color: #fff;
    padding:0 .4rem;
    em{
      font-style: normal;
    }
    .shop-item{
        display: flex;
        margin-bottom: 0.5rem;
        img{
          width: 2.7rem;
          height: 2.7rem;
        }
        .shop-des{
          margin-left: 0.5rem;
          width:100%;
          .iconfont{
            color: #ff9a0d;
          }
          .name{
            font-weight: bold;
            font-size: 0.6rem;
          }
        }
        .scale-s{
          -webkit-transform: scale(.8);
          transform: scale(.8);
          transform-origin:0 0 ;
          -webkit-transform-origin: 0 0;
          &.scale-rt{
            transform-origin:100% 0 ;
            -webkit-transform-origin: 100% 0;
          }
        }
        .shop-ct{
          margin: .2rem 0;
        }
        .rating{
          color: #ff6000;
        }
        .delivery_style span{
            font-size: 0.4rem;
            background-color: #3190e8;
            border: 0.025rem solid #3190e8;
            padding: 0.04rem 0.08rem 0;
            border-radius: 0.08rem;
            color: #fff;
        }
        .order-time{
          color: $blue;
        }
        .order-wrap{
          display: flex;
          justify-content: space-between;
        }
    }
  }
</style>