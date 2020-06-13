require('app-module-path').addPath(require('path').join(__dirname, '..'))
require('dotenv').config()

const app = require('server/app')
const initDB = require('configs/mongodb').initDB

const main = async () => {
  try {
    await initDB()
    const server = app.createServer()
    const port = process.env.PORT || 5000
    server.listen(port, () => console.log(`Server listening on port ${port}!`))
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

main().then(_ => console.log('Process started!'))
