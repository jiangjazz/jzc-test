/**
 * account
 */
import Vue from 'vue'
import { longStackSupport } from 'q';
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
    console.log('触发 登陆')
    return this.$axios.$post('/selfapi/account/login', {
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
    console.log('触发 验证登陆')
    const res = await this.$axios.$post('/selfapi/account/checklogin')
    console.log(res, 121212112)
  },
  /**
   * 退出登陆
   */
  async logout({
    commit
  }) {
    console.log('触发 退出登陆')
    return this.$axios.$post('/selfapi/account/logout')
  }
}
