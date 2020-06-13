const { camelizeKeys } = require('utils/parsers/json')

const jsonMiddleware = (req, res, next) => {
  req.body = camelizeKeys(req.body)
  next()
}

module.exports = jsonMiddleware
