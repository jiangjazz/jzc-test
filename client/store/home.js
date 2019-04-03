/*
 * @Author: Janzen 
 * @Date: 2019-03-07 16:48:39 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-04-03 10:59:42
 */

/**
 * 首页
 */

// 函数名称统计
const HOME_SET_BANNER = 'setBanner'
const HOME_SET_RECOMLIST = 'setRecomList'

// state数据
export const state = () => ({
  // banner列表
  bannerList: [],
  // 推荐帖子 列表
  recomList: [],
  // 推荐帖子 总数
  recomCount: 0,
  // 推荐帖子 单页条数
  recomLimit: 2,
})

// 同步方法
export const mutations = {
  /**
   * 设置 首页banner
   * @param {array} list -> banner列表
   */
  [HOME_SET_BANNER](state, list) {
    state.bannerList = list
  },
  /**
   * 设置 首页推荐帖子
   * @param {array} lists -> 帖子列表
   * @param {number} count -> 帖子总数
   * @param {boolean} isRefresh -> 是否刷新数据
   */
  [HOME_SET_RECOMLIST](state, {
    lists = [],
    count = 0,
    isRefresh = false
  }) {
    if (isRefresh) {
      state.recomList = lists
    } else {
      state.recomList = state.recomList.concat(lists) 
    }
    state.recomCount = count
  }
}

// 异步方法
export const actions = {
  /**
   * 获取 首页banner
   */
  async getBannerList({
    commit,
    rootGetters
  }) {
    
    const res = await this.$axios.$post('/selfapi/home/getbanner', {
      fid: rootGetters.fid
    })
    if (Number(res.success) === 1) {
      commit(HOME_SET_BANNER, res.lists)
    }
  },
  /**
   * 获取 首页推荐帖子
   * @param {number} page
   */
  async getRecomList({
    commit,
    rootGetters,
    state
  }, {
    page = 1
  }) {
    const res = await this.$axios.$post('/selfapi/home/getrecomlist', {
      fid: rootGetters.fid,
      limit: state.recomLimit,
      page
    })
    if (Number(res.success) === 1) {
      commit(HOME_SET_RECOMLIST, {
        isRefresh: Number(page) === 1,
        ...res
      })
      return new Promise((resolve, reject) => {
        resolve(res)
      })
    } else {
      return new Promise((resolve, reject) => {
        reject(res)
      })
    }
  }
}
