const errorHandler = require('utils/handlers/error.handler')
const db = require('storages/mongodb').getDB()
const cardCollection = db.collection('cards')

const getCards = async (req, res) => {
  const { language } = req.params

  const cards = await cardCollection
    .find({ language })
    .sort({ $nature: -1 })
    .toArray()

  res.send(cards)
}

module.exports = errorHandler({ getCards })
