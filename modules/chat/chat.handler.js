const errorHandler = require('utils/handlers/error.handler')
const db = require('configs/mongodb').getDB()
const chatCollection = db.collection('chats')

const getChats = async (req, res) => {
  const latestChats = await chatCollection
    .find()
    .sort({ createdAt: -1 })
    .limit(100)
    .toArray()

  res.send(latestChats)
}

module.exports = errorHandler({ getChats })
