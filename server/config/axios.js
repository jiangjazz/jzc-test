/**
 * axios配置
 */

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

axios.defaults.headers = {
  'Accept': 'application/json;charset=utf-8',
  'Content-Type': 'application/x-www-form-urlencoded'
}

const Axios = axios.create(options)

// 添加请求拦截器
Axios.interceptors.request.use(function (config) {
  console.log('请求拦截器')

  // 在发送请求之前做某件事
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  console.log(config, 12312312321)
  return config
}, function (error) {

  // 对请求错误做些什么
  return Promise.reject(error);
});

Axios.interceptors.response.use(function (response) {
  
  console.log('返还数据')
  return Promise.resolve(response);
}, function (error) {
  console.log('返还数据 出错', 1231231, error.response)
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
    console.log('post', paramsObj)

    let key
    let {
      cache,
      maxAge,
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

          if (cache && response.data) {
            let { code, success } = response.data
            if (Number(code) === 0 || Number(success) === 1) {
              console.log(111111111111)
              CACHED.set(key, response.data, maxAge)
            }
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
    console.log('get', paramsObj)

    let key
    let {
      cache,
      maxAge,
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

          if (cache && response.data) {
            let { code, success } = response.data
            if (Number(code) === 0 || Number(success) === 1) {
              console.log(111111111111)
              CACHED.set(key, response.data, maxAge)
            }
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
