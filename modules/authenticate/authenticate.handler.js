const errorHandler = require('utils/handlers/error.handler')
const { redisGet, redisSet, redisExpire, redisDelete } = require('storages/redis')
const { createJWT } = require('utils/jwt/jwt')

const getMyUsername = async (req, res) => {
  res.send({
    username: req.username
  })
}

const registerUsername = async (req, res) => {
  const { username } = req.body

  const isUsernameExist = await redisGet(username)

  if (!isUsernameExist) {
    await redisSet(username, 'user')
    await redisExpire(username, 60 * 60 * 24)
    const token = createJWT({ username })

    res.cookie('token', token, { maxAge: 60 * 60 * 24 * 1000, httpOnly: true })

    res.send({
      token
    })
    return
  }

  res.status(400).send({
    message: 'username is already picked'
  })
}

const logout = async (req, res) => {
  await redisDelete(req.username)

  res.cookie('token', null, { maxAge: 0, httpOnly: true })

  res.send({
    success: true
  })
}

module.exports = errorHandler({ getMyUsername, registerUsername, logout })
