/*
 * @Author: Janzen 
 * @Date: 2018-11-05 10:17:24 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-03-25 17:48:06
 */
const consola = require('consola')
const Router = require('express').Router
const router = Router()
const client = require('../config/redis')
const axios = require('../config/axios').axios
const formatCookie = require('../common/methods').formatCookie

const common = require('./common')
const account = require('./account')
const home = require('./home')
const chat = require('./chat')

/**
 * 自动发送cookie && 挂载redis
 */
router.use(function (req, res, next) {
  console.log('before')
  // 挂载redis
  req.client = client
  // 自动发送cookie
  let xclubcookie = req.session.xclubcookie
  if (xclubcookie) {
    axios.defaults.headers.Cookie = xclubcookie
  } else {
    axios.defaults.headers.Cookie = ''
  }
  next()
})

router.use(common)
router.use(account)
router.use(home)
router.use(chat)

/**
 * 自动保存API设置的cookie
 */
router.use(function (req, res, next) {
  console.log('after')
  let headers = req.xclub.headers || {}
  if (Number(req.xclub.status) === 200) {
    let cookie = formatCookie(headers['set-cookie'])
    console.log(headers['set-cookie'])
    // 如果存在auth字段，则存储cookie
    if (cookie.indexOf('auth') >= 0) {
      req.session.xclubcookie = cookie
      // // 传递cookie至浏览器端，方便极少数直连API获取用户信息
      // headers['set-cookie'].forEach(item => {
      //   let itemarr = item.split(';')
      //   if (itemarr[0]) {
      //     // cookie的name value
      //     let keyvalue = itemarr[0].split('=')
      //     let attrs = itemarr.slice(1)
      //     if (keyvalue.length === 2) {
      //       // cookie其他设置
      //       let attrObj = {}
      //       attrs.forEach(att => {
      //         let attrKeyValue = att.split('=')
      //         attrObj[attrKeyValue[0]] = attrKeyValue[1] || true
      //       })
  
      //       res.cookie(keyvalue[0], keyvalue[1], attrObj)
      //     }
      //   }
      // })
    }
    
  }
  return res.json(req.xclub.data)
})

module.exports = router
