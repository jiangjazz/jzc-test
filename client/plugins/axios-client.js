/*
 * @Author: Janzen 
 * @Date: 2018-11-05 15:02:11 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-03-05 19:35:51
 */
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
/**
 * axios配置
 */
export default function ({
  $axios,
  redirect,
  store
}) {
  $axios.onRequest(config => {
    console.log('Making request to ', config)
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
