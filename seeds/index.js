const cards = require('./cards_data.json')
require('app-module-path').addPath(require('path').join(__dirname, '..'))
require('dotenv').config()

const initDB = require('storages/mongodb').initDB

const populateCardsData = async () => {
  await initDB()
  const db = require('storages/mongodb').getDB()
  const cardCollection = db.collection('cards')
  const data = await db.listCollections().toArray()
  const collectionNames = data.map(item => item.name)

  if (collectionNames.includes('cards')) {
    cardCollection.drop()
    console.log('Dropped database: cards')
  }

  await cardCollection.insertMany(cards)
}

populateCardsData()
  .then(_ => { console.log('Done!'); process.exit(0) })
  .catch(err => { console.log(err); process.exit(1) })
