/*
 * @Author: Janzen 
 * @Date: 2018-11-05 10:17:24 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-03-04 19:33:27
 */
const consola = require('consola')
const Router = require('express').Router
const router = Router()
const axios = require('../config/axios')
const formatCookie = require('../common/methods').formatCookie

const common = require('./common')
const session = require('./session')
const account = require('./account')
const good = require('./good')
const order = require('./order')

/**
 * 自动发送cookie
 */
router.use(function (req, res, next) {
  let xclubcookie = req.session.xclubcookie
  if (xclubcookie) {
    axios.defaults.headers.Cookie = xclubcookie
  }
  next()
})

router.use(common)
router.use(session)
router.use(account)
router.use(good)
router.use(order)

/**
 * 自动保存API设置的cookie
 */
router.use(function (req, res, next) {
  let xclub = req.xclub || {
    headers: ''
  }
  if (Number(xclub.status) === 200) {
    // 存储cookie
    req.session.xclubcookie = formatCookie(xclub.headers['set-cookie'])
  }
  return res.json(xclub.data)
})

module.exports = router
