/*
 * @Author: Janzen 
 * @Date: 2018-11-05 10:17:24 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-03-27 19:41:42
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
const upload = require('./upload')

/**
 * 自动发送cookie && 挂载redis
 */
router.use(function (req, res, next) {
  console.log('before', req.url, req.method)
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
router.use(upload)

/**
 * 自动保存API设置的cookie
 */
router.use(function (req, res, next) {
  console.log('after')
  let { headers={}, data={} } = req.xclub
  if (Number(req.xclub.status) === 200) {
    let cookie = formatCookie(headers['set-cookie'])
    console.log(headers['set-cookie'])
    // 如果存在auth字段，则存储cookie
    if (cookie.indexOf('auth') >= 0) {
      req.session.xclubcookie = cookie
    }
  }
  return res.json(data)
})

module.exports = router
