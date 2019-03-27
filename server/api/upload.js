/*
 * @Author: Janzen 
 * @Date: 2019-03-26 17:32:28 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-03-27 20:03:41
 */

const Router = require('express').Router
const router = Router()
const APIS = require('../config/api')

const request = require('request')

/**
 * 发帖上传图片
 * @param {formdata} Filedata 图片文件formdata
 */
router.post('/upload/image', async (req, res, next) => {

  req.pipe(APIS.COMMON_UPLOADIMAGE({
    headers: {
      'Cookie': req.session.xclubcookie || ''
    }
  }, (err,response,body) => {

    if (!err && response.statusCode == 200) {
      const info = JSON.parse(body)
      req.xclub = {
        headers: response.headers,
        status: response.statusCode,
        data: info
      }
      next()
    } else {
      return res.json({
        _ssrcode: 100,
        _ssrerror: 'Upload failed',
        err
      })
    }
  }))

})

module.exports = router
