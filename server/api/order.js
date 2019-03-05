/*
 * @Author: Janzen 
 * @Date: 2018-11-08 15:37:13 
 * @Last Modified by: Janzen
 * @Last Modified time: 2018-12-28 14:59:22
 */

const Router = require('express').Router
const axios = require('../config/axios')
const router = Router()

/**
 * 获取 订单列表
 */
router.post('/order/list', (req, res, next) => {
  async function getOrderList() {
    const response = await axios.get(`/rest-v2/order/list?token=${req.session.xshop_token}`, {
      params: req.body
    })
    return response
  }

  getOrderList().then(e => {
      return res.json(e)
    })
    .catch(err => {
      return res.json(err)
    })
})

/**
 * 获取 单个订单
 */
router.post('/order/single', (req, res, next) => {
  async function getOrder() {
    const response = await axios.get(`/rest-v2/order/single?token=${req.session.xshop_token}`, {
      params: req.body
    })
    return response
  }

  getOrder().then(e => {
      return res.json(e)
    })
    .catch(err => {
      return res.json(err)
    })
})

/**
 * 生成 快递单号
 */
router.post('/order/editexpress', (req, res, next) => {
  async function editExpress() {
    const response = await axios.post(`/rest-v2/order/edit-express?token=${req.session.xshop_token}`, req.body)
    return response
  }

  editExpress().then(e => {
      return res.json(e)
    })
    .catch(err => {
      return res.json(err)
    })
})

module.exports = router
