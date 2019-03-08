/*
 * @Author: Janzen 
 * @Date: 2019-03-07 10:00:58 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-03-08 14:48:32
 */

// redis
const redisOption = {
  host: '127.0.0.1',
  port: '6379',
  pass: ''
}
// lru-cache
const LRUOptions = {
  max: 0,
  length: function (n, key) {
    return n * 2 + key.length
  },
  dispose: function (...attr) {
    console.log('dispose', attr)
  },
  maxAge: 1000 * 5
}

module.exports = {
  redisOption,
  LRUOptions
}
