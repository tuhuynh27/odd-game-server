const db = require('storages/mongodb').getDB()
const chatCollection = db.collection('chats')

const chatSocketHandler = (io, socket) => {
  socket.on('chat-global', (message) => {
    const newChat = {
      username: socket.username,
      message,
      time: new Date().getTime() / 1000
    }
    chatCollection.insertOne(newChat).catch(err => console.error(err))
    io.emit('chat-global', socket.username, message)
  })
}

module.exports = chatSocketHandler
