/*
 * @Author: Janzen 
 * @Date: 2019-03-11 15:26:32 
 * @Last Modified by: Janzen
 * @Last Modified time: 2019-03-11 16:33:36
 */
module.exports = function (io) {

  const messages = []
  io.on('connection', (socket) => {

    socket.on('last-messages', function (fn) {
      fn(messages.slice(-50))
    })

    socket.on('send-message', function (message) {
      messages.push(message)
      socket.broadcast.emit('new-message', message)
    })
    
  })
}
