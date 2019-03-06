/*
 * @Author: Janzen 
 * @Date: 2018-12-27 10:02:23 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-03-06 14:24:49
 */
/**
 * 通用信息
 */
const Router = require('express').Router
const router = Router()
const APIS = require('../config/api')

/**
 * 获取 国家/城市/商铺列表
 */
router.post('/common/getcoutrylist', (req, res, next) => {

  APIS.COMMON_GETCOUNTRYLIST().then(e => {
      if (Number(e.status) === 200 && Number(e.data.success) === 1) {
        // 挂载信息并传递
        req.xclub = e
        next()
      } else {
        // 设置错误，以便client端全局报错
        e.data._ssrcode = 100
        e.data._ssrerror = e.data.msg
        return res.json(e)
      }
    })
    .catch(err => {
      return res.json(err)
    })
})

module.exports = router
