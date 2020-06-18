const roomSocketHandler = (io, socket) => {
  socket.on('join room', (roomName) => {
    if (!socket.inRoom) {
      socket.join(roomName)
      socket.inRoom = roomName
    }
  })
  socket.on('leave room', (roomName) => {
    socket.leave(roomName)
    socket.inRoom = null
  })
}

module.exports = roomSocketHandler
