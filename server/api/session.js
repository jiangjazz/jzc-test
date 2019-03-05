/*
 * @Author: Janzen 
 * @Date: 2018-11-06 10:56:11 
 * @Last Modified by: Janzen
 * @Last Modified time: 2018-11-26 10:39:04
 */

const Router = require('express').Router
const router = Router()

router.post('/session/setusermsg', (req, res, next) => {
  let {
    token,
    username
  } = req.body
  req.session.xshop_token = token
  req.session.username = username
  
  if (req.session.xshop_token) {
    return res.json({
      success: true,
      data: {
        status: 200,
        message: 'Session set success!'
      }
    })
  } else {
    return res.json({
      success: true,
      data: {
        status: 0,
        message: 'No session is set!'
      }
    })
  }
})

module.exports = router
