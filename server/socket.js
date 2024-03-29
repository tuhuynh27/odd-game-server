const cookie = require('cookie')
const { verifyJWT } = require('utils/jwt/jwt')

const mountSocketIOHandlers = (io) => {
  io.use(async (socket, next) => {
    if (socket.handshake.headers && socket.handshake.headers.cookie) {
      try {
        const cookies = cookie.parse(socket.handshake.headers.cookie)
        socket.username = verifyJWT(cookies.token).username
        next()
      } catch (err) {
        next(new Error('Authentication error'))
      }
    } else {
      next(new Error('Authentication error'))
    }
  })

  io.on('connection', (socket) => {
    const chatSocketHandler = require('modules/chat/chat.socket')
    const roomSocketHandler = require('modules/room/room.socket')
    chatSocketHandler(io, socket)
    roomSocketHandler(io, socket)

    socket.on('ping', () => {
      socket.emit('pong')
    })

    socket.on('disconnect', () => {
      io.emit(`user ${socket.username} disconnected`)
    })
  })
}

module.exports = mountSocketIOHandlers
