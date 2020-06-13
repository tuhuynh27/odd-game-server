const express = require('express')
const router = express.Router()

const jwtMiddleware = require('middlewares/jwt.middleware')

const { getAllUsers } = require('modules/user/user.handler')

router.route('/').get(jwtMiddleware, getAllUsers)

module.exports = router
