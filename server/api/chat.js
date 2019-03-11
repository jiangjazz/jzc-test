/*
 * @Author: Janzen 
 * @Date: 2019-03-11 16:35:19 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-03-11 17:18:09
 */

const Router = require('express').Router
const router = Router()
const APIS = require('../config/api')

/**
 * 获取 私信消息列表
 */
router.post('/chat/getmessage', (req, res, next) => {

  APIS.CHAT_GETMESSAGE({
    // cache: true
  }).then(e => {
    // console.log('getmessage', e.data)

    if (Number(e.status) === 200 && Number(e.data.code) === 0) {
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

module.exports = router
