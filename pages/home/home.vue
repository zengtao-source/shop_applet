<template>
  <view>
    <!-- 使用自定义的搜索组件 -->
    <view class="search-box">
      <my-search @click="gotoSearch"></my-search>
    </view>
    <!-- 轮播图区域 -->
    <!-- 
      swiper 参数介绍：
      indicator-dots：是否显示指示点，默认为false。（轮播图下方的小圆点）
      autoplay：是否自动播放，默认为false。
      interval：自动播放的时间间隔，单位为毫秒，默认为5000。
      duration：滑动动画的时长，单位为毫秒，默认为500。
      circular：是否采用衔接滑动，默认为false。
     -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <!-- 循环渲染轮播图的 item 项 -->
      <swiper-item v-for="(item, i) in swiperList" :key="i">
        <!-- navigator 用于页面跳转类似于 <a href=""></a> -->
        <!-- 
            属性说明：
            url:应用内的跳转链接，值为相对路径或者绝对路径，注意不能加 .vue 后缀
         -->
        <navigator class="swiper-item" :url="`../../subpkg/good_detail/good_detail?goods_id=${item.goods_id}`">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 分类导航区域 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(item, i) in navList" :key="i" @click="navClickHandler(item)">
        <image :src="item.image_src" class="nav-img"></image>
      </view>
    </view>
    <!-- 楼层区域 -->
    <view class="floor-list">
      <!-- 楼层 item 项 -->
      <view class="floor-item" v-for="(floorListItem, floorListI) in floorList" :key="floorListI">
        <!-- 楼层标题 -->
        <image :src="floorListItem.floor_title.image_src" class="floor-title"></image>
        <!-- 楼层图片区域 -->
        <view class="floor-img-box">
          <!-- 左侧大图片的盒子 -->
          <navigator class="left-img-box" :url="floorListItem.product_list[0].url">
            <!-- 
            image 属性
            scaleToFill：（默认值）缩放模式，不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素
            aspectFit：保持纵横比缩放图片，使图片的长边能完全显示出来
            aspectFill：保持纵横比缩放图片，只保证图片的短边能完全显示出来
            widthFix：宽度不变，高度自动变化，保持原图宽高比不变
            heightFix：高度不变，宽度自动变化，保持原图宽高比不变
             -->

            <image :src="floorListItem.product_list[0].image_src"
              :style="{width: floorListItem.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
          </navigator>
          <!-- 右侧 4 个小图片盒子 -->
          <view class="right-img-box">
            <view v-for="(productList, productListI) in floorListItem.product_list" :key="productListI">
              <navigator class="right-img-item" v-if="productListI !== 0" :url="productList.url">
                <image :src="productList.image_src" mode="widthFix" :style="{width: productList.image_width + 'rpx'}">
                </image>
              </navigator>
            </view>
          </view>
        </view>
      </view>

    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 轮播图的数据列表，默认为空数组
        swiperList: [],
        // 分类导航的数据列表
        navList: [],
        // 楼层的数据列表
        floorList: [],
      };
    },
    onLoad() {
      // 获取轮播图数据
      this.getSwiperList()
      // 获取分类导航数据
      this.getNavList()
      // 获取楼层数据
      this.getFloorList()
    },
    methods: {
      // 获取轮播图数据的方法
      async getSwiperList() {
        // 1.发起请求
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/swiperdata')
        // 2 请求失败
        // 2.1 正常版本
        // if (res.meta.status !== 200) {
        //   return  uni.showToast({
        //     title: '数据请求失败',
        //     duration: 1500,
        //     icon: 'none',
        //   })
        // }
        // 2.2 全局封装版本
        if (res.meta.status !== 200) return uni.$showMsg()
        // 3 请求成功 为 data 中的数据赋值
        this.swiperList = res.message
      },
      // 获取分类导航数据
      async getNavList() {
        // 1. 发起请求
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/catitems')
        // 2. 请求失败
        if (res.meta.status !== 200) return uni.$showMsg()
        // 3. 请求成功 为 data 中的数据赋值
        this.navList = res.message
      },
      // 获取楼层数据
      async getFloorList() {
        // 1. 发起请求
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/floordata')
        // 2. 请求失败
        if (res.meta.status !== 200) return uni.$showMsg()
        // console.log(res.message, 'res.message === floor')
        // 2.5. 数据请求成功，赋值数据之前处理一下数据
        // 通过双层forEach循环，处理url地址
        res.message.forEach(floor => {
          floor.product_list.forEach(prod => {
            prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
          })
        })
        // 3. 请求成功 为 data 中的数据赋值
        this.floorList = res.message
      },
      // 分类导航的点击事件
      navClickHandler(item) {
        if (item.name === '分类') {
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }
      },
      gotoSearch() {
        // 跳转到分包中的搜索页面
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      },
    },
  }
</script>

<style lang="scss">
  .search-box {
    // 设置定位效果为“吸顶”
    position: sticky;
    // 吸顶的“位置”
    top: 0;
    // 提高层级，防止被轮播图覆盖
    z-index: 999;
  }
  swiper {
    height: 300rpx;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
  }

  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;

    .nav-img {
      width: 128rpx;
      height: 140rpx;
    }
  }

  .floor-list {
    .floor-title {
      height: 60rpx;
      width: 100%;
      display: flex;
    }

    .floor-img-box {
      display: flex;
      padding-left: 10rpx;

      .right-img-box {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
      }
    }
  }
</style>
