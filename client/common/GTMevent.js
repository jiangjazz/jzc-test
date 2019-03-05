/**
 * 依据事件类型，向GTM发送不同指令
 */
module.exports = function (eventType, res) {
  // 正则匹配
  let loginPattern = /^\/api\/mobile\/index\.php\?version\=5\&module\=login/gi
  let registerPattern = /^\/api\/mobile\/index\.php\?version\=5\&module\=register/gi
  let threadPattern = /^\/api\/mobile\/index\.php\?version\=5\&module\=newthread/gi
  let postPattern = /^\/api\/mobile\/index\.php\?version\=5\&module\=sendreply/gi
  // 必须是浏览器环境下并且 dataLayer 已加载完毕
  if (window && window.dataLayer && Array.isArray(window.dataLayer)) {
    console.log('%c触发GTM统计', 'background: lightyellow;')

    let dataLayer = window.dataLayer // 获取GTM事件数组
    /**
     * 检测类型并推送事件
     */
    if (eventType.match(loginPattern)) {
      // 登陆
      if (Number(res.code) === 0) {
        // 登陆成功执行
        console.log('登陆成功执行')
        dataLayer.push({
          event: 'LoginEvent',
          account: res.data.Variables
        })
      }
    } else if (eventType.match(registerPattern)) {
      // 注册
      if (Number(res.code) === 0) {
        // 注册执行成功
        console.log('注册执行成功')
        dataLayer.push({
          event: 'RegistEvent',
          account: res.data.Variables
        })
      }
    } else if (eventType.match(threadPattern)) {
      // 发帖
      if (Number(res.code) === 0) {
        console.log('发帖执行成功')
        dataLayer.push({
          event: 'ThreadEvent',
          account: res.data.Variables
        })
      }
    } else if (eventType.match(postPattern)) {
      // 回复帖子
      if (Number(res.code) === 0) {
        console.log('发帖执行成功')
        dataLayer.push({
          event: 'PostEvent',
          account: res.data.Variables
        })
      }
    }
  }
}
