/**
 * axios配置
 */

// import * as axios from 'axios'
const axios = require('axios')
const nuxtConfig = require('../../nuxt.config')
const qs = require('qs')

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
  // 在发送请求之前做些什么
  console.log(config, 766666)
  // 在发送请求之前做某件事
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

Axios.interceptors.response.use(function (response) {
  console.log(response.data, 12341234)
  return Promise.resolve(response);
}, function (error) {
  return Promise.reject(error.response.data);
});

// export default Axios;
// module.exports = Axios
module.exports = {
  axios: Axios,
  //Post  请求方式
  post(url, params = {}, config = {}) {
    return new Promise((resolve, reject) => {
      Axios.post(url, params, config).then(response => {
          resolve(response);
        }, err => {
          reject(err);
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  //GET 请求方式
  get(url, params = {}) {
    return new Promise((resolve, reject) => {
      Axios.get(url, {
          params: params
        }).then(response => {
          resolve(response);
        }, err => {
          reject(err);
        })
        .catch((error) => {
          reject(error)
        });
    })

  },

  patch(url, params = {}) {
    return new Promise((resolve, reject) => {
      Axios.patch(url, params).then(response => {
          resolve(response);
        }, err => {
          reject(err)
        })
        .catch((error) => {
          reject(error)
        });
    })
  },

  put(url, params = {}) {
    return new Promise((resolve, reject) => {
      Axios.put(url, {
          params: params
        }).then(response => {
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
