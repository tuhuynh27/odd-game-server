const db = require('configs/mongodb').getDB()
const chatCollection = db.collection('chats')

const chatSocketHandler = (io, socket) => {
  socket.on('global chat', (message) => {
    const newChat = {
      userName: socket.userName,
      message,
      time: new Date().getTime() / 1000
    }
    chatCollection.insertOne(newChat).catch(err => console.error(err))
    io.emit('global chat', socket.userName, message)
  })
}

module.exports = chatSocketHandler
