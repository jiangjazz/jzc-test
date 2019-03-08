/*
 * @Author: Janzen 
 * @Date: 2018-11-05 10:17:24 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-03-08 10:46:59
 */
const consola = require('consola')
const Router = require('express').Router
const router = Router()
const axios = require('../config/axios').axios
const formatCookie = require('../common/methods').formatCookie

const common = require('./common')
const account = require('./account')
const home = require('./home')

/**
 * 自动发送cookie
 */
router.use(function (req, res, next) {
  console.log('before')
  let xclubcookie = req.session.xclubcookie
  if (xclubcookie) {
    axios.defaults.headers.Cookie = xclubcookie
  }
  next()
})

router.use(common)
router.use(account)
router.use(home)

/**
 * 自动保存API设置的cookie
 */
router.use(function (req, res, next) {
  console.log('after')
  let headers = req.xclub.headers || {}
  if (Number(req.xclub.status) === 200) {
    let cookie = formatCookie(headers['set-cookie'])
    // 如果存在auth字段，则存储cookie
    if (cookie.indexOf('auth') >= 0) {
      req.session.xclubcookie = cookie
    }
    console.log(cookie)
  }
  return res.json(req.xclub.data)
})

module.exports = router
