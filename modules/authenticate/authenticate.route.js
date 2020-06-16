const express = require('express')
const router = express.Router()

const jwtMiddleware = require('middlewares/jwt.middleware')

const { registerusernameValidator } = require('modules/authenticate/authenticate.schema')
const { getMyusername, registerusername, logout } = require('modules/authenticate/authenticate.handler')

router.route('/me').get(jwtMiddleware, getMyusername)
router.route('/register').post(registerusernameValidator, registerusername)
router.route('/logout').post(jwtMiddleware, logout)

module.exports = router
