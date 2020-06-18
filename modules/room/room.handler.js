const errorHandler = require('utils/handlers/error.handler')
const db = require('storages/mongodb').getDB()
const roomCollection = db.collection('rooms')
roomCollection.createIndex({ name: 1 }, { unique: true })

const createRoom = async (req, res) => {
  const newRoom = req.body
  const { country } = req.params

  const defaultProperties = {
    host: req.username,
    current: 0,
    guest: 0,
    status: 'WAITING',
    country
  }

  const newRoomObj = {
    ...defaultProperties,
    ...newRoom
  }

  const { insertedId } = await roomCollection.insertOne(newRoomObj)
  res.send({ _id: insertedId })
}

const getRooms = async (req, res) => {
  const { country } = req.params

  const rooms = await roomCollection
    .find({ country })
    .sort({ $nature: -1 })
    .toArray()

  res.send(rooms)
}

module.exports = errorHandler({ createRoom, getRooms })
