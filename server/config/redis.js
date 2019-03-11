/*
 * @Author: Janzen 
 * @Date: 2019-03-11 10:18:28 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-03-11 11:38:34
 */
// 仅缓解服务器压力，刷新依旧保存
const redisOption = require('./index').redisOption
const redis = require("redis");
const client = redis.createClient(redisOption)
// node v8 or higher， 
const bluebird = require('bluebird')
// const {promisify} = require('util')
// const getAsync = promisify(client.get).bind(client)
bluebird.promisifyAll(redis)

module.exports = client
