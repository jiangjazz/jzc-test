const Axios = require('./axios')
const Request = require('./request')

/**
 * 通用
 */
// 获取国家列表
const COMMON_GETCOUNTRYLIST = params => Axios.get('/plugin.php?id=countrys&country=1', params)
// 发帖上传图片
const COMMON_UPLOADIMAGE = (params, callback) => Request.post({
  url: '/api/mobile/index.php?version=5&module=uploadimage',
  ...params
}, callback)

/**
 * 账户 相关
 */
// 登陆
const ACCOUNT_LOGIN = params => Axios.post('/api/mobile/index.php?version=5&module=login', params)
// 验证假登陆(成功返还个人信息)
const ACCOUNT_CHECKLOGIN = params => Axios.get('/api/mobile/index.php?version=5&module=profile', params)
// 退出登陆
const ACCOUT_LOGOUT = params => Axios.get('/api/mobile/index.php?version=4&module=logout', params)

/**
 * 首页
 */
// 首页banner
const HOME_GETBANNER = params => Axios.post('/plugin.php?id=banners_manage', params)
// 首页推荐帖子
const HOME_GETRECOMLIST = params => Axios.post('/plugin.php?id=recom_threads', params)

/**
 * 聊天 私信 && 群聊
 */
const CHAT_GETMESSAGE = params => Axios.get('/api/mobile/index.php?version=5&module=mypm', params)

module.exports = {
  // 通用
  COMMON_GETCOUNTRYLIST,
  COMMON_UPLOADIMAGE,
  // 账户
  ACCOUNT_LOGIN,
  ACCOUNT_CHECKLOGIN,
  ACCOUT_LOGOUT,
  // 首页
  HOME_GETBANNER,
  HOME_GETRECOMLIST,
  // 聊天 私信 && 群聊
  CHAT_GETMESSAGE
}
