/*
 * @Author: Janzen 
 * @Date: 2019-03-06 14:18:01 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-03-08 11:05:56
 */

/**
 * 国家列表
 */

// 函数名称统计
const COUNTRYLIST_SET = 'setCountryList'

// state数据
export const state = () => ({
  // 国家列表信息
  countryList: []
})

// 同步方法
export const mutations = {
  /**
   * 设置 国家列表信息
   * @param {array} list -> 国家列表信息
   */
  [COUNTRYLIST_SET](state, list) {
    state.countryList = list
  }
}

// 异步方法
export const actions = {
  /**
   * 获取 国家列表信息
   */
  // async getCountryList({
  //   commit
  // }) {
  //   // console.log(ucenterUid)
  //   let res = await this.$axios.$post('/selfapi/common/getcoutrylist')
  //   console.log(res)
  //   if (Number(res.success) === 1) {
  //     commit(COUNTRYLIST_SET, res.lists)
  //   }
  // }
}
