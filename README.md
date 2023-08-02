# 黑马商城小程序
## 1.起步
### 具体操作步骤
详情参见[起步文档说明地址](https://applet-base-api-t.itheima.net/docs-uni-shop/1.start.html)

## 2.tabBar
### 具体操作步骤
详情参见[tabBar文档说明地址](https://applet-base-api-t.itheima.net/docs-uni-shop/2.tabbar.html)
### 注意点
pages.json 中 `pages` 属性的第一个对象的 `navigationBarTitleText` 可以覆盖 `globalStyle` 属性中的 `navigationBarTitleText`
`pages` 属性的优先级高于 `globalStyle`
```json
  "pages": [{
      "path": "pages/home/home",
      "style": {
        "navigationBarTitleText": "白马优购",
        "enablePullDownRefresh": false
      }
    }]
  // ...
  "globalStyle": {
    "navigationBarTextStyle": "#fff",
    "navigationBarTitleText": "白马优购",
    "navigationBarBackgroundColor": "#c00",
    "backgroundColor": "#fff",
    "app-plus": {
      "background": "#efeff4"
    }
  },
```
## 3.首页
### 具体操作步骤
详情参见[首页文档说明地址](https://applet-base-api-t.itheima.net/docs-uni-shop/3.home.html)
### 难点
1. 配置网络请求
2. 封装 `uni.$showMsg()` 方法
3. navigator 标签

### 注意点
1. 配置网络请求 里面代码细节和思路未了解，需要好好细读代码
2. 封装 `uni.$showMsg()` 方法步骤
  - 1. 新建 utils.js 文件
  - 2. 在 main.js 中引入， 并挂载到 uni.$showMsg 上面（注意utils.js 导出的是函数 在 main.js 中挂载的时候 不要带小括号） 
  - 3. 使用 uni.$showMsg(title, duration, icon)
3. 标签的常用属性
```txt
  介绍：
  navigator 用于页面跳转类似于 <a href=""></a>
  属性说明：
  url:应用内的跳转链接，值为相对路径或者绝对路径，注意不能加 .vue 后缀
  open-type: 直接百度
```

## 4.分类
### 具体操作步骤
详情参见[分类文档说明地址](https://applet-base-api-t.itheima.net/docs-uni-shop/4.cate.html)
### 注意点
1. 使用竖向滚动时，需要给 `<scroll-view>` 一个固定高度，通过 css 设置 height；使用横向滚动时，需要给`<scroll-view>`添加white-space: nowrap;样式。
2. 小程序动态类名的设置方式 
- 1. 详情参见[vue官网](https://v2.cn.vuejs.org/v2/guide/class-and-style.html#ad)
- 2. 对象语法
- 3. 数组语法
3. css的`flex-direction`和`flex-wrap`
4. 给 `<scroll-view>`设置 `scroll-top`时需要加`this.$nextTick(function() {})` 防止view层不同步渲染问题
## 5.搜索
## 6.商品列表
## 7.商品详情
## 8.加入购物车
## 9.购物车页面
## 10.登录与支付
## 11.发布