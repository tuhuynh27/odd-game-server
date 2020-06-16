const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET || 'DEFAULT_SECRET'

const createJWT = (identify, obj) =>
  jwt.sign(
    {
      ...identify,
      ...obj
    },
    secret,
    { expiresIn: '24h' }
  )

const verifyJWT = token => jwt.verify(token, secret)

module.exports = { createJWT, verifyJWT }
