const express = require('express')
const router = express.Router()

const jwtMiddleware = require('middlewares/jwt.middleware')

const authenticateRoutes = require('modules/authenticate/authenticate.route')
const chatRoutes = require('modules/chat/chat.router')
const roomRoutes = require('modules/room/room.route')

router.use('/authenticate', authenticateRoutes)
router.use('/chat', jwtMiddleware, chatRoutes)
router.use('/rooms', jwtMiddleware, roomRoutes)

module.exports = router
