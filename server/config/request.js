const request = require('request')
const nuxtConfig = require('../../nuxt.config')

let options = {
  baseUrl: nuxtConfig.env.baseUrl
}

let defaultRequest = request.defaults(options)

module.exports = defaultRequest
