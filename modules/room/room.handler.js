const slugify = require('slugify')
const errorHandler = require('utils/handlers/error.handler')
const db = require('storages/mongodb').getDB()
const roomCollection = db.collection('rooms')
roomCollection.createIndex({ name: 1 }, { unique: true })
const privateChatCollection = db.collection('private-chats')

const createRoom = async (req, res) => {
  const newRoom = req.body
  const { country } = req.params
  const { name } = newRoom
  const slugName = slugify(name.toLowerCase())

  const defaultProperties = {
    host: req.username,
    current: 0,
    guest: 0,
    status: 'WAITING',
    country
  }

  const newRoomObj = {
    ...defaultProperties,
    ...newRoom,
    slug: slugName
  }

  const { insertedId } = await roomCollection.insertOne(newRoomObj)
  res.send({
    _id: insertedId,
    slug: slugName
  })
}

const getRooms = async (req, res) => {
  const { country } = req.params

  const rooms = await roomCollection
    .find({ country })
    .sort({ $nature: -1 })
    .toArray()

  res.send(rooms)
}

const getRoomChat = async (req, res) => {
  const { slug } = req.params

  const chats = await privateChatCollection
    .find({ room: slug })
    .sort({ $nature: -1 })
    .toArray()

  res.send(chats)
}

module.exports = errorHandler({ createRoom, getRooms, getRoomChat })
