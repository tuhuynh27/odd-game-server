const cors = require('cors')

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

const corsMiddleware = cors(corsOptions)

module.exports = corsMiddleware
