/**
 * axios配置
 */

// import * as axios from 'axios'
const axios = require('axios')
const nuxtConfig = require('../../nuxt.config')
const qs = require('qs')
const CACHED = require('./cache')
const md5 = require('md5')

let options = {
  baseURL: nuxtConfig.env.baseUrl,
  withCredentials: true,
  timeout: 5000
}

const headers = {
  // 'Accept': 'application/json;charset=utf-8',
  'Content-Type': 'application/x-www-form-urlencoded'
  // 'Content-Type': 'application/json;charset=utf-8'
};

axios.defaults.headers = headers;

const Axios = axios.create(options)

// 添加请求拦截器
Axios.interceptors.request.use(function (config) {
  console.log('请求拦截器')

  // 在发送请求之前做某件事
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

Axios.interceptors.response.use(function (response) {
  console.log('返还数据')
  // console.log(response.data, 12341234)
  return Promise.resolve(response);
}, function (error) {
  console.log('返还数据 出错', error, 1231231, error.response)
  let {
    response,
    config
  } = error
  if (!response) {
    return Promise.reject({
      status: 500,
      msg: 'Server timeout',
      data: config
    });
  } else {
    return Promise.reject(error.response.data);
  }

});


// module.exports = Axios
module.exports = {
  axios: Axios,
  //Post  请求方式
  post(url, paramsObj = {}) {
    console.log('post')

    let key
    let {
      cache,
      ...params
    } = paramsObj
    if (cache) {
      key = md5(url + JSON.stringify(params))
      if (CACHED.has(key)) {
        console.log('走缓存')

        // 缓存命中
        return Promise.resolve({
          status: 200,
          data: CACHED.get(key)
        })
      }
    }

    return new Promise((resolve, reject) => {
      console.log('promise')

      Axios.post(url, params).then(response => {
          console.log('promise success')

          if (cache) {
            CACHED.set(key, response.data)
          }
          resolve(response);
        }, err => {
          console.log('promise error')

          reject(err);
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  //GET 请求方式
  get(url, paramsObj = {}) {
    console.log('get')

    let key
    let {
      cache,
      ...params
    } = paramsObj
    if (cache) {
      key = md5(url + JSON.stringify(params))
      if (CACHED.has(key)) {
        console.log('走缓存')

        // 缓存命中
        return Promise.resolve({
          status: 200,
          data: CACHED.get(key)
        })
      }
    }

    return new Promise((resolve, reject) => {
      Axios.get(url, {
          params: params
        }).then(response => {

          if (cache) {
            CACHED.set(key, response.data)
          }
          resolve(response);
        }, err => {
          reject(err);
        })
        .catch((error) => {
          reject(error)
        });
    })

  }
}
