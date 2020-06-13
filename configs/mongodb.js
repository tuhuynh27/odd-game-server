const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/odd-game-db'

let db = null

const initDB = async () => {
  const client = await MongoClient.connect(process.env.MONGODB_URI || url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  db = client.db()
}

const getDB = () => db || new Error('Connect to DB failed!')

module.exports = { getDB, initDB }
