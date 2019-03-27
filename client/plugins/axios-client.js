/*
 * @Author: Janzen 
 * @Date: 2018-11-05 15:02:11 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-03-26 21:16:45
 */
/**
 * axios配置
 */
const qs = require('qs')

export default function ({
  $axios,
  redirect,
  store
}) {
  $axios.defaults.headers = {
    'Content-Type': 'application/json;charset=utf-8'
  }
  $axios.onRequest(config => {
    console.log('Making request to ', config)
    return config
  })
  $axios.onResponse(res => {
    let data = res.data
    // 有格式化后的报错
    if (data._ssrcode && data._ssrerror) {
      store.commit('setPopmsg', {
        msg: data._ssrerror
      })
    }
    // console.log(res.data)
    // 注意，直接返回res，axios最终自动返还会res.data值
    return res
  })
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
