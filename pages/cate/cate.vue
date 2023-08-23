<template>
  <view>
    <!-- 使用自定义的搜索组件 -->
    <my-search @click="gotoSearch"></my-search>
    <!-- 容器 -->
    <view class="scroll-view-container">
      <!-- 左侧滚动视图区域  -->
      <scroll-view class="left-scroll-view" scroll-y :style="{height: wh + 'px'}">
        <block v-for="(item, i) in cateList" :key="i">
          <view @click="activeChanged(i)" :class="['left-scroll-view-item', i === active ? 'active' : '']">{{item.cat_name}}</view>
        </block>
      </scroll-view>
      <!-- 右侧滚动视图区域  -->
      <scroll-view class="right-scroll-view" scroll-y :style="{height: wh + 'px'}" :scroll-top="scrollTop">
        <view class="cateLevel2" v-for="(cateListLevelTwoItem, cateListLevelTwoI) in cateListLevelTwo" :key="cateListLevelTwoI">
          <view class="cateLevel2Title">
            / {{cateListLevelTwoItem.cat_name}} /
          </view>
          <!-- 动态渲染三级分类的列表数据 -->
          <view class="cateLevel3List">
            <view class="cateLevel3Item" v-for="(item, i) in cateListLevelTwoItem.children" :key="i" @click="gotoGoodsList(item)">
              <!-- 图片 -->
              <image></image>
              <!-- 文本 -->
              <text>{{item.cat_name}}</text>
            </view>
            
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 左右两边滚动区域不滚动的高度，超出后可滚动
        // 窗口的可用高度 = 屏幕高度 - navigationBar高度 - tabbar高度
        wh: 0,
        // 左侧分类数据列表
        cateList: [],
        // 右侧二级分类列表
        cateListLevelTwo: [],
        // 左侧分类选中索引
        active: 0,
        // 滚动条距离顶部的距离
        scrollTop: 0,
      };
    },
    onLoad() {
      // 获取当前系统信息
      const sysInfo = uni.getSystemInfoSync()
      // console.log(sysInfo, '===sys')
      // 为 wh 窗口可用高度动态赋值
      this.wh = sysInfo.windowHeight - 50
      // 调用获取分类列表数据的方法
      this.getCateList()
    },
    methods: {
      // 左侧一级分类列表数据
      async getCateList() {
        // 1. 发起请求
        const {data: res} = await uni.$http.get('/api/public/v1/categories')
        // 2. 请求失败
        if (res.meta.status !== 200) return uni.$showMsg()
        // 3. 请求成功 为 data 中的数据赋值
        // 给左侧一级分类赋值数据
        this.cateList  = res.message
        // 给右侧二级分类赋值数据
        this.cateListLevelTwo = res.message[0].children
      },
      // 二级分类点击改变事件
      activeChanged(index) {
        // 左侧分类点击后赋值类名active
        this.active = index
        // 一个分类改变后，改变二级分类的数据
        this.cateListLevelTwo = this.cateList[index].children
        // 滚动三级分类后，再去切换二级分类，滚动距离应该回到初始位置
        // this.$nextTick 解决view层不同步的问题
        this.$nextTick(function() {
          this.scrollTop = this.scrollTop ? 0 : 1
        })
      },
      // 三级分类跳转事件 item 当前列表数据
      gotoGoodsList(item) {
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?cid=' + item.cat_id
        })
      },
      gotoSearch() {
        // 跳转到分包中的搜索页面
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      },
    }
  }
</script>

<style lang="scss">
.scroll-view-container {
  display: flex;
  .left-scroll-view {
    width: 120px;
    .left-scroll-view-item {
      background-color: #f7f7f7;
      line-height: 60px;
      text-align: center;
      font-size: 12px;
      &.active { 
        background-color: #fff;
        position: relative;
        &::before {
          content: '';
          display: block;
          width: 3px;
          height: 30px;
          background-color: #c00000;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
  .right-scroll-view {
    .cateLevel2Title {
      font-size: 12px;
      font-weight: bold;
      text-align: center;
      padding: 15px 0;
    }
    .cateLevel3List {
      display: flex;
      flex-wrap: wrap;
      .cateLevel3Item {
        width: 33.33%;
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        image {
          width: 60px;
          height: 60px;
          background-color: skyblue;
        }
        text {
          font-size: 12px;
        }
      }
    }
  }
  
}
</style>
