/*
 * @Author: Janzen 
 * @Date: 2018-11-05 10:18:12 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-03-06 11:45:48
 */

const Router = require('express').Router
const axios = require('../config/axios')
const router = Router()

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
      if (Number(e.status) === 200 && Number(e.data.code) === 0) {
        let usermsg = e.data.data.Variables || {}
        // 存储用户信息
        req.session.uid = usermsg.member_uid
        req.session.usermsg = usermsg
        next()
      } else {
        e.data._ssrcode = 100
        e.data._ssrerror = e.data.msg
        return res.json(e.data)
      }
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


/**
 * 退出登陆
 */
router.post('/logout', (req, res, next) => {

  async function checkLogin() {
    const response = await axios({
      method: 'get',
      url: '/api/mobile/index.php?version=4&module=logout'
    })
    return response
  }
  checkLogin().then(e => {
      delete req.session.xclubcookie
      return res.json(e.data)
    })
    .catch(err => {
      return res.json(err)
    })
})

module.exports = router
