const errorHandler = require('utils/handlers/error.handler')
const db = require('storages/mongodb').getDB()
const chatCollection = db.collection('chats')

const getChats = async (req, res) => {
  const latestChats = await chatCollection
    .find()
    .sort({ $natural: -1 })
    .limit(100)
    .toArray()

  res.send(latestChats)
}

module.exports = errorHandler({ getChats })
