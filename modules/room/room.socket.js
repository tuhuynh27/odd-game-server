const db = require('storages/mongodb').getDB()
const cardCollection = db.collection('cards')
const privateChatCollection = db.collection('private-chats')

const roomSocketHandler = (io, socket) => {
  socket.on('join-room', async ({ operation, slug }) => {
    if (!socket.inRoom) {
      socket.join(slug)
      socket.inRoom = slug

      const blackCard = await cardCollection.aggregate([
        { $match: { color: 'black' } },
        { $sample: { size: 1 } }
      ]).toArray()
      const cards = await cardCollection.aggregate([
        { $match: { color: 'white' } },
        { $sample: { size: 10 } }
      ]).toArray()

      const blackCardId = blackCard[0]._id.toString()
      const collectionCardIds = cards.map(card => card._id.toString())

      io.emit(slug, {
        roomInfo: {
          _id: 1,
          slug: slug,
          round: 0
        },
        mode: operation === 'join' ? 1 : 0, // 0/1 => Spectate/Join mode
        collectionCards: collectionCardIds,
        blackCard: blackCardId,
        playedCards: []
      })
    }
  })

  socket.on('chat-private', (message) => {
    if (!socket.inRoom) return

    const newChat = {
      username: socket.username,
      message,
      time: new Date().getTime() / 1000,
      room: socket.inRoom
    }
    privateChatCollection.insertOne(newChat).catch(err => console.error(err))
    io.emit(socket.inRoom, 'chat', socket.username, message)
  })

  socket.on('leave room', (roomName) => {
    socket.leave(roomName)
    socket.inRoom = null
  })
}

module.exports = roomSocketHandler
