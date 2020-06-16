const express = require('express')
const router = express.Router()

const jwtMiddleware = require('middlewares/jwt.middleware')

const { registerUsernameValidator } = require('modules/authenticate/authenticate.schema')
const { getMyUsername, registerUsername, logout } = require('modules/authenticate/authenticate.handler')

router.route('/me').get(jwtMiddleware, getMyUsername)
router.route('/register').post(registerUsernameValidator, registerUsername)
router.route('/logout').post(jwtMiddleware, logout)

module.exports = router
