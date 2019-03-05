/*
 * @Author: Janzen 
 * @Date: 2018-11-06 16:49:49 
 * @Last Modified by: Janzen
 * @Last Modified time: 2018-12-28 12:07:48
 */

const Router = require('express').Router
const axios = require('../config/axios')
const router = Router()

/**
 * 获取 商品列表
 */
router.post('/good/list', (req, res, next) => {
  async function getGoodList() {
    const response = await axios.get(`/rest-v2/goods/list?token=${req.session.xshop_token}`, {
      params: req.body
    })
    return response
  }

  getGoodList().then(e => {
      return res.json(e)
    })
    .catch(err => {
      return res.json(err)
    })
})

/**
 * 获取 商品库 列表
 */
router.post('/good/store', (req, res, next) => {
  async function getStoreList() {
    const response = await axios.get(`/rest-v2/goods/stock?token=${req.session.xshop_token}`, {
      params: req.body
    })
    return response
  }

  getStoreList().then(e => {
      return res.json(e)
    })
    .catch(err => {
      return res.json(err)
    })
})

/**
 * 改变 商品上架状态
 */
router.post('/good/changestatus', (req, res, next) => {
  async function setGoodStatus() {
    const response = await axios.post(`/rest-v2/goods/sale?token=${req.session.xshop_token}`, req.body)
    return response
  }

  setGoodStatus().then(e => {
      return res.json(e)
    })
    .catch(err => {
      return res.json(err)
    })
})

/**
 * 新增 商品
 */
router.post('/good/create', (req, res, next) => {
  async function createGood() {
    const response = await axios.post(`/rest-v2/goods/create?token=${req.session.xshop_token}`, req.body)
    return response
  }

  createGood().then(e => {
      return res.json(e)
    })
    .catch(err => {
      return res.json(err)
    })
})

/**
 * 编辑 商品
 */
router.post('/good/update', (req, res, next) => {
  async function updateGood() {
    const response = await axios.post(`/rest-v2/goods/update?token=${req.session.xshop_token}`, req.body)
    return response
  }

  updateGood().then(e => {
      return res.json(e)
    })
    .catch(err => {
      return res.json(err)
    })
})

/**
 * 修改排序
 */
router.post('/good/editGoodSort', (req, res, next) => {
  async function editGoodSort() {
    const response = await axios.post(`/rest-v2/goods/edit-sort?token=${req.session.xshop_token}`, req.body)
    return response
  }

  editGoodSort().then(e => {
      return res.json(e)
    })
    .catch(err => {
      return res.json(err)
    })
})

module.exports = router
