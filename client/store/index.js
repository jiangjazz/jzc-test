/*
 * @Author: Janzen 
 * @Date: 2018-05-25 09:14:18 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-04-02 15:07:06
 */
/**
 * 全局store
 */
// import LangJson from '@/static/lang'

// 函数名称统计
const G_SET_COOKIE = 'setCookie'
const G_SET_DIALOG = 'setDialog'
const G_SET_USERMSG = 'setUsermsg'
const G_SET_POPMSG = 'setPopmsg'
const G_SET_COUNTRY = 'setCountry'
const G_SET_COUNTRYLIST = 'setCountryList'

// 全局变量
const DEFAULT_LOCALE = 'global'

// state数据
export const state = () => ({
  //
  xclubcookie: '',
  // api的前缀地址，默认从nuxt.config.js读取
  baseUrl: process.env.baseUrl || '',
  // 自身路径
  selfUrl: process.env.selfUrl || '',
  // 当前国家
  locale: DEFAULT_LOCALE,
  // 国家列表信息
  countryList: [],
  // chooseCountry模态框是否可见
  countryDialogVisible: false,
  // login模态框是否可见
  loginDialogVisible: false,
  // chat 模态框是否可见
  chatDialogVisible: false,
  // 用户id
  uid: null,
  // 用户信息
  usermsg: {},
  // 全局弹窗信息
  popMessage: {},
  // 当前国家信息
  country: {}
})

// getters
export const getters = {
  // 链接上的多语言前缀
  preLink(state) {
    return state.locale === DEFAULT_LOCALE ? '' : `/${state.locale}`
  },
  // 用户名
  username(state) {
    return state.usermsg.member_username
  },
  // 国家id
  fid(state) {
    return state.country.fid || null
  },
  // 格式化国家列表
  formatCountryList(state) {
    let countryObj = {}
    state.countryList.forEach(item => {
      let sn = item.sname.toLowerCase()
      countryObj[sn] = {
        "fid": item.fid,
        "icon": item.icon,
        "route": sn,
        "lang": Number(item.fid) === 211 ? 'fr' : 'en',
        "country": item.name
      }
    })
    return countryObj
  }
}

// 同步方法
export const mutations = {
  /**
   * 设置 cookie
   * @param {string} cookie
   */
  [G_SET_COOKIE](state, cookie) {
    state.xclubcookie = cookie
  },
  /**
   * 设置 国家列表信息
   * @param {array} list -> 国家列表信息
   */
  [G_SET_COUNTRYLIST](state, list) {
    state.countryList = list
  },
  /**
   * 设置 国家信息
   * @param {object} country 
   */
  [G_SET_COUNTRY](state, country={}) {
    state.country = country
    state.locale = country.route || DEFAULT_LOCALE
  },
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
   * 设置 全局提示信息
   * @param {object} message 
   */
  [G_SET_POPMSG](state, message) {
    let { type='error', msg='' } = message
    state.popMessage = {
      type,
      msg
    }
  },
}

// 异步方法
export const actions = {
  /**
   * 特殊方法
   * 从服务器端传输数据到客户端
   */
  async nuxtServerInit({
    commit,
    dispatch,
    getters
  }, {
    req,
    redirect,
    params,
    path,
    query,
    Url
  }) {
    console.log('服务器初始化，开始加载国家')
    console.log(req.session, req.sessionID)
    await dispatch('getCountryList')
    // 从路由获取当前国家
    let LangJson = getters.formatCountryList
    let lang = LangJson[params.lang] ? params.lang : DEFAULT_LOCALE
    commit(G_SET_COUNTRY, LangJson[lang])

    if (req.session) {
      // 判定是否存在个人usermsg
      if (req.session.usermsg) {
        commit(G_SET_USERMSG, req.session.usermsg)
      }
      if (req.session.xclubcookie) {
        commit(G_SET_COOKIE, req.session.xclubcookie)
        // 验证是否假登陆
        await dispatch('account/checkLogin', { cookie: req.session.xclubcookie})
      }
    }
  },
  /**
   * 获取 国家列表信息
   */
  async getCountryList({
    commit
  }) {
    let res = await this.$axios.$post('/selfapi/common/getcoutrylist')
    // console.log(res, 'getCountryList')
    if (Number(res.success) === 1) {
      // console.log(res.lists)
      commit(G_SET_COUNTRYLIST, res.lists.filter(item => Number(item.is_country) === 1))
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
      countryDialogVisible: false,
      loginDialogVisible: false,
      chatDialogVisible: false
    }
    switch (dialog) {
      case 'country':
        dialogs.countryDialogVisible = true
        break
      case 'login':
        dialogs.loginDialogVisible = true
        break
      case 'chat':
        dialogs.chatDialogVisible = true
        break
      default:
        break
    }
    commit(G_SET_DIALOG, dialogs)
  }
}
