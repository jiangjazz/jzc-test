/*
 * @Author: Janzen 
 * @Date: 2018-12-27 10:02:23 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-03-11 13:02:39
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
router.post('/common/getcoutrylist', async (req, res, next) => {

  let redisCountry = await req.client.getAsync('countrylist')
  if (redisCountry) {
    console.log('读取redis缓存')

    // 读取redis缓存
    return res.json({
      success: 1,
      lists: JSON.parse(redisCountry)
    })
  } else {

    APIS.COMMON_GETCOUNTRYLIST().then(e => {
        console.log('正常访问API')

        if (Number(e.status) === 200 && Number(e.data.success) === 1) {
          // redis缓存
          req.client.set('countrylist', JSON.stringify(e.data.lists), 'EX', 60 * 60)
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
  }
})

router.post('/common/clearstore', (req, res, next) => {
  console.log(req.session)
  req.session.destroy(function (err) {
    console.log('clear store', err)
    return res.json({
      code: 0,
      msg: 'clear store success'
    })
  })
})

module.exports = router
