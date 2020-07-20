const { camelizeKeys } = require('utils')
const db = require('storages/mongodb').getDB()
const cardCollection = db.collection('cards')

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

      io.emit('game-session', camelizeKeys({
        roomInfo: {
          _id: 1,
          slug: slug,
          round: 0
        },
        mode: operation === 'join' ? 1 : 0,
        collectionCards: collectionCardIds,
        blackCard: blackCardId,
        playedCards: []
      }))
    }
  })
  socket.on('leave room', (roomName) => {
    socket.leave(roomName)
    socket.inRoom = null
  })
}

module.exports = roomSocketHandler
