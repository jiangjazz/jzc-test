/*
 * @Author: Janzen 
 * @Date: 2018-12-27 10:02:23 
 * @Last Modified by: Janzen
 * @Last Modified time: 2018-12-27 10:04:44
 */
/**
 * 通用信息
 */
const Router = require('express').Router
const axios = require('../config/axios')
const router = Router()

/**
 * 获取 国家/城市/商铺列表
 */
router.post('/common/rmslist', (req, res, next) => {
  async function getRMSList() {
    const response = await axios.get(`/rest-v1/common/rms-list`, {
      params: req.body
    })
    return response
  }

  getRMSList().then(e => {
      return res.json(e)
    })
    .catch(err => {
      return res.json(err)
    })
})

module.exports = router
