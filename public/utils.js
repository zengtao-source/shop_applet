/**
 * @title 提示信息
 * @duration 提示显示时间
 * @icon 提示框图标
 * showToast 消息提示框组件
 */
export const showMsg = (title = '数据加载失败！', duration = 1500, icon = 'none') => {
  uni.showToast({
    title,
    duration,
    icon,
  })
}
