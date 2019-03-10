/*
 * @Author: Janzen 
 * @Date: 2019-03-08 10:46:16 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-03-10 16:28:32
 */

const Router = require('express').Router
const router = Router()
const APIS = require('../config/api')

/**
 * 首页banner
 * @param {string | number} fid 所属国家id
 */
router.post('/home/getbanner', (req, res, next) => {
  let {
    fid
  } = req.body

  APIS.HOME_GETBANNER({
      cache: true,
      maxAge: 1000 * 60,
      fid
    }).then(e => {

      if (Number(e.status) === 200 && Number(e.data.success) === 1) {
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

      return res.json(err)
    })
})

/**
 * 首页推荐帖子
 * @param {string | number} fid 所属国家id
 * @param {number} limit 单页帖子数
 * @param {string | number} page 当前页数
 */
router.post('/home/getrecomlist', (req, res, next) => {
  let {
    fid,
    limit = 5,
    page = 1
  } = req.body

  APIS.HOME_GETRECOMLIST({
      cache: true,
      fid,
      limit,
      page
    }).then(e => {

      if (Number(e.status) === 200 && Number(e.data.success) === 1) {
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
      
      return res.json(err)
    })
})

module.exports = router
