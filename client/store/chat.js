/*
 * @Author: Janzen 
 * @Date: 2019-03-11 16:42:39 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-03-12 09:33:26
 */

/**
 * 首页
 */

// 函数名称统计
const CHAT_SET_MESSAGELIST = 'setMessageList'

// state数据
export const state = () => ({
  // 消息列表
  messageList: []
})

// 同步方法
export const mutations = {
  /**
   * 设置 消息列表
   * @param {array} list -> 消息列表
   */
  [CHAT_SET_MESSAGELIST](state, list) {
    state.messageList = list
  }
}

// 异步方法
export const actions = {
  /**
   * 获取 消息列表
   */
  async getMessageList({
    commit
  }) {
    
    const res = await this.$axios.$post('/selfapi/chat/getmessage')
    // console.log(res)
    if (Number(res.code) === 0) {
      commit(CHAT_SET_MESSAGELIST, res.data.Variables.list)
    }
  }
}
