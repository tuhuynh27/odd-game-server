const validateMiddleware = validateSchema => async (req, res, next) => {
  try {
    await validateSchema.validateAsync(req.body)
    next()
  } catch (err) {
    res.status(400).send({ error: err })
  }
}

module.exports = validateMiddleware
