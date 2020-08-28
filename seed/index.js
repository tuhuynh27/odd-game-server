const cards = require('./cards_data.json')
require('app-module-path').addPath(require('path').join(__dirname, '..'))
require('dotenv').config()

const initDB = require('storages/mongodb').initDB

const populateCardsData = async () => {
  try {
    await initDB()
    const db = require('storages/mongodb').getDB()
    const cardCollection = db.collection('cards')
    const data = await db.listCollections().toArray()
    const collectionNames = data.map(item => item.name)

    if (collectionNames.includes('cards')) {
      console.log('Drop cards database...')
      cardCollection.drop()
    }

    console.log('Populating data....')
    cardCollection.insertMany(cards)

    console.log('Done!!!')
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

populateCardsData()
