/*
 * @Author: Janzen 
 * @Date: 2018-05-25 09:14:18 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-03-05 21:49:12
 */
/**
 * 全局store
 */
import Vue from 'vue'
import LangJson from '@/static/lang'

// 函数名称统计
const G_SET_DIALOG = 'setDialog'
const G_SET_USERMSG = 'setUsermsg'
const G_SET_POPMSG = 'setPopmsg'

// 全局变量
const DEFAULT_LOCALE = 'global'

// state数据
export const state = () => ({
  // 当前国家
  locale: DEFAULT_LOCALE,
  // login模态框是否可见
  loginDialogVisible: false,
  // 用户id
  uid: null,
  // 用户信息
  usermsg: {},
  // 全局弹窗信息
  popMessage: {}
})

// getters
export const getters = {
  // 链接上的多语言前缀
  preLink(state) {
    return state.locale === DEFAULT_LOCALE ? '' : `/${state.locale}`
  }
}

// 同步方法
export const mutations = {
  /**
   * 设置模态框是否可见
   * @param {obj} dialogs -> 弹窗对象
   */
  [G_SET_DIALOG](state, dialogs) {
    Object.keys(dialogs).map(item => {
      if (state[item] !== dialogs[item]) {
        state[item] = dialogs[item]
      }
    })
  },
  /**
   * 设置 用户信息
   * @param {object} usermsg 
   */
  [G_SET_USERMSG](state, usermsg) {
    state.usermsg = usermsg
    state.uid = usermsg.member_uid || null
  },
  /**
   * 设置 全局弹窗信息
   * @param {object} message 
   */
  [G_SET_POPMSG](state, message) {
    let { type='error', msg='' } = message
    state.popMessage = {
      type,
      msg
    }
  }
}

// 异步方法
export const actions = {
  /**
   * 特殊方法
   * 从服务器端传输数据到客户端
   */
  nuxtServerInit({
    commit,
    dispatch
  }, {
    req,
    redirect,
    params,
    path,
    query,
    Url
  }) {
    console.log('服务器初始化')
    console.log(req.session)
    if (req.session) {
      // 判定是否存在个人usermsg
      if (req.session.usermsg) {
        commit(G_SET_USERMSG, req.session.usermsg)
      }
    }
  },
  /***
   * 检测弹窗，并确认弹出对应弹窗
   * @param {string} dialog -> 对应弹窗
   */
  showDialog({
    commit,
    state
  }, {
    dialog
  }) {
    // 所有dialog集合
    let dialogs = {
      // countryDialogVisible: false,
      loginDialogVisible: false
    }
    switch (dialog) {
      // case 'country':
      //   dialogs.countryDialogVisible = true
      //   break
      case 'login':
        dialogs.loginDialogVisible = true
        break
      default:
        break
    }
    commit(G_SET_DIALOG, dialogs)
  }
}
