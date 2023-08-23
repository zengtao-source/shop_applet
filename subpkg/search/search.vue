<template>
  <view>
    <view class="search-box">
      <uni-search-bar @input="input" :radius="100" cancelButton="none"></uni-search-bar>
    </view>
    <!-- 搜索建议列表 -->
    <view class="sugg-list" v-if="searchResults.length !== 0">
      <view class="sugg-item" v-for="(item, i) in searchResults" :key="i" @click="gotoDetail(item.goods_id)">
        <view class="goods-name">
          {{item.goods_name}}
        </view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
    <!-- 搜索历史 -->
    <view class="history-box" v-else>
      <!-- 标题区域 -->
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17" @click="cleanHistory"></uni-icons>
      </view>
      <!-- 列表区域 -->
      <view class="history-list">
        <uni-tag :text="item" v-for="(item, i) in historys" :key="i" @click="gotoGoodsList(item)"></uni-tag>
      </view>
    </view>
  </view>
</template>
<script>
  export default {
    data() {
      return {
        // 首页搜索防抖变量
        timer: null,
        // 首页搜索关键词
        kw: '',
        // 搜索结果列表
        searchResults: [],
        // 搜索关键词的历史记录
        historyList: ['a', 'app', 'apple']
      };
    },
    computed: {
      historys() {
        return [...this.historyList].reverse()
      }
    },
    onLoad() {
      // 在 onLoad 生命周期函数中，加载本地存储的搜索历史记录
      this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
    },
    methods: {
      // 根据搜索关键词，搜索商品建议列表
      async getSearchList() {
        // 判断关键词是否为空
        if (this.kw === '') {
          this.searchResults = []
          return
        }
        // 发起请求，获取搜索建议列表
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/qsearch', {
          query: this.kw
        })
        if (res.meta.status !== 200) return uni.$showMsg()
        this.searchResults = res.message
        // console.log(this.searchResults, 'this.searchResults')
        this.saveSearchHistory()
      },
      // 首页搜索建议
      input(e) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.kw = e
          // 根据关键词，查询搜索建议列表
          this.getSearchList()
        }, 500)
      },
      // item项点击事件，点击调转
      gotoDetail(goods_id) {
        uni.navigateTo({
          // 指定详情页面的 URL 地址，并传递 goods_id 参数
          url: '/subpkg/good_detail/good_detail?goods_id=' + goods_id
        })
      },
      // 点击搜索历史关键词跳转到商品列表页面
      gotoGoodsList(kw) {
        uni.navigateTo({
          // 指定详情页面的 URL 地址，并传递 goods_id 参数
          url: '/subpkg/goods_list/goods_list?query=' + kw
        })
      },
      // 保存搜索历史关键词
      saveSearchHistory() {
        /** 
         * 使用data存储历史关键词存在两个问题
         * 1.关键词前后顺序的问题（使用计算属性复制一份数据，通过复制的数据调用数组的 reverse() 方法对数组进行反转）
         * 2.关键词重复的问题（可以使用 Set 对象进行去重操作）
         * 2.1 将 Array 数组转化为 Set 对象
         * 2.2 调用 Set 对象的 delete 方法，移除对应的元素
         * 2.3 调用 Set 对象的 add 方法，向 Set 中添加元素
         * 2.4 将 Set 对象转化为 Array 数组
         * */
        // this.historyList.push(this.kw)
        // 1. 将 Array 数组转化为 Set 对象
        const set = new Set(this.historyList)
        // 2. 调用 Set 对象的 delete 方法，移除对应的元素
        set.delete(this.kw)
        // 3. 调用 Set 对象的 add 方法，向 Set 中添加元素
        set.add(this.kw)
        // 4. 将 Set 对象转化为 Array 数组
        this.historyList = Array.from(set)
        // 调用 uni.setStorageSync(key, value) 将搜索历史记录持久化存储到本地
        uni.setStorageSync('kw', JSON.stringify(this.historyList))
      },
      // 清空搜索历史
      cleanHistory(){
        // 清空 data 中保存的搜索历史
        this.historyList = []
        // 清空本地存储中记录的搜索历史
        uni.setStorageSync('kw', '[]')
      }
    },
  }
</script>
<style lang="scss">
  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;
  }
  .history-box {
    padding: 0 5px;
  
    .history-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      font-size: 13px;
      border-bottom: 1px solid #efefef;
    }
  
    .history-list {
      display: flex;
      flex-wrap: wrap;
  
      .uni-tag {
        margin-top: 5px;
        margin-right: 5px;
      }
    }
  }
  .sugg-list {
    padding: 0 5px;
  
    .sugg-item {
      font-size: 12px;
      padding: 13px 0;
      border-bottom: 1px solid #efefef;
      display: flex;
      align-items: center;
      justify-content: space-between;
  
      .goods-name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-right: 3px;
      }
    }
  }
</style>