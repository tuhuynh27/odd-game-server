const createServer = (app, beginMiddlewares, routes, endMiddlewares) => {
  app.use(beginMiddlewares)
  app.use('/api', routes)
  app.use(endMiddlewares)

  const server = require('http').createServer(app)
  const io = require('socket.io')(server)

  io.origins('*:*')

  return {
    http: server,
    io
  }
}

const createServerWrapper = () => {
  const app = require('express')()
  const routes = require('server/route')
  const corsMiddleware = require('middlewares/cors.middleware')
  const compression = require('compression')()
  const cookieParser = require('cookie-parser')()
  const bodyParseUrl = require('body-parser').urlencoded({ extended: false })
  const bodyParseJson = require('body-parser').json()
  const errorMiddleware = require('middlewares/error.middleware')

  const beginMiddlewares = [
    corsMiddleware,
    compression,
    cookieParser,
    bodyParseUrl,
    bodyParseJson
  ]

  const defaultHandler = (_, res) => {
    res.status(403).send({
      message: 'You cannot access this endpoint'
    })
  }

  const endMiddlewares = [errorMiddleware, defaultHandler]

  return createServer(app, beginMiddlewares, routes, endMiddlewares)
}

module.exports.createServer = createServerWrapper
