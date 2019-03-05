/*
 * @Author: Janzen 
 * @Date: 2018-05-25 09:14:18 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-03-04 19:31:57
 */
/**
 * 全局store
 */
import Vue from 'vue'
import LangJson from '@/static/lang'
// window.fetch() 的 Polyfill
// require('whatwg-fetch')

// 函数名称统计
// const G_SET_LANG = 'setLang'

// 全局变量
// const DEFAULT_LOCALE = 'global'

// state数据
export const state = () => ({
})

// 同步方法
export const mutations = {
  /**
   * 设置语言版本
   * @param {string} locale -> 语言
   */
  // [G_SET_LANG](state, locale) {
  //   state.locale = locale
  // }
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
      // // 判定是否存在个人uid
      // if (req.session.uid) {
      //   console.log('目前用户id是', req.session.uid)
      //   commit(G_SET_UID, req.session.uid)
      // }
      // // 判定是否签到过
      // if (req.session.sign) {
      //   console.log('目前用户是否签到过', req.session.sign)
      //   commit(G_SET_SIGN, req.session.sign)
      // }
      // // 判定是否存在个人usermsg
      // if (req.session.usermsg) {
      //   // console.log('目前用户个人信息是', req.session.usermsg)
      //   commit(G_SET_USERMSG, req.session.usermsg)
      // }
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
      countryDialogVisible: false
    }
    switch (dialog) {
      case 'country':
        dialogs.countryDialogVisible = true
        break
      case 'login':
        dialogs.loginDialogVisible = true
        break
      case 'register':
        dialogs.registerDialogVisible = true
        break
      case 'forgetpw':
        dialogs.forgetpwDialogVisible = true
        break
      case 'medal':
        dialogs.medalDialogVisible = true
        break
      default:
        break
    }
    commit(G_SET_DIALOG, dialogs)
  }
}
