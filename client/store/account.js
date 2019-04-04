/**
 * account
 */
// 函数名称统计'

// state数据
export const state = () => ({})

// 同步方法 mutations
export const mutations = {}

// action
export const actions = {
  /**
   * 登陆
   * @param {string} username
   * @param {string} password
   */
  async login({
    commit
  }, {
    username,
    password,
    loginsubmit
  }) {
    console.log('触发 登陆')
    return this.$axios.$post('/selfapi/account/login', {
      username,
      password,
      loginsubmit
    })
  },
  /**
   * 验证假登陆
   * @param {string} cookie
   */
  async checkLogin({
    commit
  }, {
    cookie
  }) {
    console.log('触发 验证登陆', cookie)
    const res = await this.$axios.$post('/selfapi/account/checklogin', {
      cookie: cookie
    })
    if (Number(res.code) !== 0) {
      // 假登陆状态，清除用户信息
      commit('setUsermsg', {}, {
        root: true
      })
    }
  },
  /**
   * 退出登陆
   */
  async logout({
    commit
  }) {
    console.log('触发 退出登陆')
    const res = this.$axios.$post('/selfapi/account/logout')
    commit('setUsermsg', {}, {
      root: true
    })
    commit('setPopmsg', {
      type: 'success',
      msg: res.msg
    }, {
      root: true
    })
  }
}
