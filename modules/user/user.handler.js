const db = require('configs/mongodb').getDB()
const errorHandler = require('utils/handlers/error.handler')

const getAllUsers = async (_, res) => {
  const userCollection = db.collection('users')
  const allUsers = await userCollection.find({}).toArray()

  res.send(allUsers)
}

module.exports = errorHandler({ getAllUsers })
