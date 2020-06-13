const express = require('express')
const router = express.Router()

const jwtMiddleware = require('middlewares/jwt.middleware')

const { registerUserNameValidator } = require('modules/authenticate/authenticate.schema')
const { getMyUserName, registerUsername } = require('modules/authenticate/authenticate.handler')

router.route('/me').get(jwtMiddleware, getMyUserName)
router.route('/register').post(registerUserNameValidator, registerUsername)

module.exports = router
