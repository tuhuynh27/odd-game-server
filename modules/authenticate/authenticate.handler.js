const errorHandler = require('utils/handlers/error.handler')
const { redisGet, redisSet, redisExpire } = require('configs/redis')
const { createJWT } = require('utils/jwt/jwt')

const getMyUserName = async (req, res) => {
  res.send({
    userName: req.userName
  })
}

const registerUsername = async (req, res) => {
  const { userName } = req.body

  const isUserNameExist = await redisGet(userName)

  if (!isUserNameExist) {
    await redisSet(userName, 'user')
    await redisExpire(userName, 60 * 60 * 24)
    const token = createJWT({ userName })

    res.cookie('token', token, { maxAge: 60 * 60 * 24 * 1000, httpOnly: true })

    res.send({
      token
    })
    return
  }

  res.status(400).send({
    message: 'Username is already picked'
  })
}

module.exports = errorHandler({ getMyUserName, registerUsername })
