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

## 4.分类
## 5.搜索
## 6.商品列表
## 7.商品详情
## 8.加入购物车
## 9.购物车页面
## 10.登录与支付
## 11.发布