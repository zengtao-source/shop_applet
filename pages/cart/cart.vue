<template>
  <view class="cart-container" v-if="cart.length !== 0">
    <!-- 收货地址组件 -->
    <my-address></my-address>
    <!-- 购物车商品列表的标题区域 -->
    <view class="cart-title">
      <!-- 左侧图标 -->
      <uni-icons type="shop" size="18"></uni-icons>
      <!-- 描述文本 -->
      <text class="cart-title-text">购物车</text>
    </view>
    <!-- 商品列表区域 -->
    <!-- uni-swipe-action 是最外层包裹性质的容器 -->
    <uni-swipe-action>
      <block v-for="(goods, i) in cart" :key="i">
        <!-- uni-swipe-action-item 可以为其子节点提供滑动操作的效果。需要通过 options 属性来指定操作按钮的配置信息 -->
        <uni-swipe-action-item :rightOptions="options" @click="swipeActionClickHandler(goods)">
          <my-goods :goods="goods" showNum showRadio @num-change="numberChangeHandler"
            @radio-change="radioChangeHandler"></my-goods>
        </uni-swipe-action-item>

      </block>
    </uni-swipe-action>

    <!-- 结算区域 -->
    <my-settle></my-settle>
  </view>
  <!-- 空白购物车区域 -->
  <view class="empty-cart" v-else>
    <image src="/static/tab_icons/cart-active.png" class="empty-img"></image>
    <text class="tip-text">空空如也~</text>
  </view>
</template>

<script>
  import badgeMix from '@/mixins/tabbar-badge.js'
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    // 将 badgeMix 混入到当前的页面中进行使用
    mixins: [badgeMix],
    computed: {
      // 将 m_cart 模块中的 cart 数组映射到当前页面中使用
      ...mapState('m_cart', ['cart'])
    },
    data() {
      return {
        options: [{
          text: '删除', // 显示的文本内容
          style: {
            backgroundColor: '#C00000' // 按钮的背景颜色
          }
        }]
      };
    },
    methods: {
      ...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById', 'updateAllGoodsState']),
      // 商品选择框改变事件
      radioChangeHandler(e) {
        // 商品的勾选状态发生了变化
        // 输出得到的数据 -> {goods_id: 395, goods_state: false}
        console.log('radioChangeHandler', e)
        this.updateGoodsState(e)
      },
      // 商品数量改变事件
      numberChangeHandler(e) {
        console.log('numberChangeHandler', e)
        this.updateGoodsCount(e)
      },
      // 点击了滑动操作按钮
      swipeActionClickHandler(goods) {
        console.log(goods, 'swipeActionClickHandler')
        this.removeGoodsById(goods.goods_id)
      },
    },
  }
</script>

<style lang="scss">
  .cart-container {
    padding-bottom: 50px;
  }

  .cart-title {
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 14px;
    padding-left: 5px;
    border-bottom: 1px solid #efefef;

    .cart-title-text {
      margin-left: 10px;
    }
  }
  .empty-cart {
    display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 150px;
    
      .empty-img {
        width: 90px;
        height: 90px;
      }
    
      .tip-text {
        font-size: 12px;
        color: gray;
        margin-top: 15px;
      }
  }
</style>
