/**
 * account
 */
import Vue from 'vue'
// 函数名称统计'

// state数据
export const state = () => ({
})

// 同步方法 mutations
export const mutations = {
}

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
    console.log('触发登陆')
    return this.$axios.$post('/selfapi/login', {
      username,
      password,
      loginsubmit
    })
  },
  /**
   * 验证假登陆
   */
  async checkLogin({
    commit
  }) {
    console.log('触发验证登陆')
    const res = await this.$axios.$post('/selfapi/checklogin')
    console.log(res, 121212112)
  }
}
