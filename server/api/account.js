/*
 * @Author: Janzen 
 * @Date: 2018-11-05 10:18:12 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-04-02 15:25:05
 */

const Router = require('express').Router
const router = Router()
const APIS = require('../config/api')

/**
 * 登陆
 * @param {string} username 用户名
 * @param {string} password 密码
 * @param {string} loginsubmit 是否记住密码， type: yes | no
 */
router.post('/account/login', (req, res, next) => {
  let {
    username,
    password,
    loginsubmit
  } = req.body

  APIS.ACCOUNT_LOGIN({
      loginsubmit,
      username,
      password
    }, {
      headers: {
        'Cookie': req.session.xclubcookie || ''
      }
    }).then(e => {

      if (Number(e.status) === 200 && Number(e.data.code) === 0) {
        let usermsg = e.data.data.Variables || {}
        // 存储用户信息
        req.session.uid = usermsg.member_uid
        req.session.usermsg = usermsg
        // 挂载信息并传递
        req.xclub = e
        next()
      } else {
        // 设置错误，以便client端全局报错
        e.data._ssrcode = 100
        e.data._ssrerror = e.data.msg
        return res.json(e.data)
      }
    })
    .catch(err => {

      console.log(err, '最终报错')
      err._ssrcode = err.status || 500
      err._ssrerror = err.msg || 'Server error'
      return res.json(err)
    })
})

/**
 * 验证是否登陆，若已登陆则返还个人信息
 */
router.post('/account/checklogin', (req, res, next) => {
  let {
    cookie
  } = req.body

  APIS.ACCOUNT_CHECKLOGIN({}, {
      headers: {
        'Cookie': cookie
      }
    }).then(e => {
      if (Number(e.status) === 200 && Number(e.data.code) === 0) {
        // 挂载信息并传递
        req.xclub = e
        next()
      } else {
        // 清除个人信息
        delete req.session.xclubcookie
        delete req.session.uid
        delete req.session.usermsg
        return res.json(e.data)
      }
    })
    .catch(err => {

      return res.json(err)
    })
})


/**
 * 退出登陆
 */
router.post('/account/logout', (req, res, next) => {

  APIS.ACCOUT_LOGOUT({}, {
      headers: {
        'Cookie': req.session.xclubcookie || ''
      }
    }).then(e => {

      // 清除个人信息
      delete req.session.xclubcookie
      delete req.session.uid
      delete req.session.usermsg

      return res.json(e.data)
    })
    .catch(err => {

      return res.json(err)
    })
})

module.exports = router
