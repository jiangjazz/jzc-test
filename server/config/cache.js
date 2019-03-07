/*
 * @Author: Janzen 
 * @Date: 2019-03-07 11:07:19 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-03-07 11:07:54
 */

const LRU = require('lru-cache')
const LRUOptions = require('./index').LRUOptions
const CACHED = new LRU(LRUOptions)

module.exports = CACHED
