const Axios = require('./axios')

/**
 * 账户 相关
 */
// 登陆
const ACCOUNT_LOGIN = params => Axios.post('/api/mobile/index.php?version=5&module=login', params)
// 验证假登陆(成功返还个人信息)
const ACCOUNT_CHECKLOGIN = params => Axios.get('/api/mobile/index.php?version=5&module=profile', params)
// 退出登陆
const ACCOUT_LOGOUT = params => Axios.get('/api/mobile/index.php?version=4&module=logout', params)


module.exports = {
  ACCOUNT_LOGIN,
  ACCOUNT_CHECKLOGIN,
  ACCOUT_LOGOUT
}