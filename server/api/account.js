/*
 * @Author: Janzen 
 * @Date: 2018-11-05 10:18:12 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-03-04 14:06:23
 */

const Router = require('express').Router
const axios = require('../config/axios')
const router = Router()

const formatCookie = require('../common/methods').formatCookie

/**
 * 登陆
 * @param {string} username
 * @param {string} password
 */
router.post('/login', (req, res, next) => {
  let {
    username,
    password
  } = req.body
  async function login() {
    const response = await axios({
      method: 'post',
      url: '/api/mobile/index.php?version=5&module=login',
      data: {
        loginsubmit: 'yes',
        username,
        password
      }
    })
    return response
  }
  login().then(e => {
      req.xclub = e
      next()
    })
    .catch(err => {
      return res.json(err)
    })
})

/**
 * 验证是否登陆，若已登陆则返还个人信息
 */
router.post('/checklogin', (req, res, next) => {

  async function checkLogin() {
    const response = await axios({
      method: 'get',
      url: '/api/mobile/index.php?version=5&module=profile'
    })
    return response
  }
  checkLogin().then(e => {
      // return res.json(e.data)
      req.xclub = e
      next()
    })
    .catch(err => {
      return res.json(err)
    })
})

module.exports = router
