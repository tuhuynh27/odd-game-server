const { verifyJWT } = require('utils/jwt/jwt')

const jwtMiddleware = (req, res, next) => {
  try {
    const token = getToken(req)
    const payload = verifyJWT(token)

    const { email, nickname } = payload
    req.email = email
    req.nickname = nickname

    next()
  } catch (err) {
    res.status(401)
    res.send({ message: 'Unauthorized', error: err })
  }
}

const getToken = req =>
  req.headers.authorization &&
  req.headers.authorization.split(' ')[0] === 'Bearer'
    ? req.headers.authorization.split(' ')[1]
    : req.query && req.query.token
      ? req.query.token
      : null

module.exports = jwtMiddleware
