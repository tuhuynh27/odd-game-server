require('app-module-path').addPath(require('path').join(__dirname, '..'))
require('dotenv').config()

const app = require('server/app')
const mountSocketIOHandlers = require('server/socket')
const initDB = require('storages/mongodb').initDB
const initRedis = require('storages/redis').initRedis

const main = async () => {
  try {
    await initDB()
    await initRedis()
    const { http, io } = app.createServer()
    const port = process.env.PORT || 5000
    http.listen(port, () => console.log(`Server listening on port ${port}!`))
    mountSocketIOHandlers(io)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

main().then(_ => console.log('Process started!'))
