const express = require('express')
const router = express.Router()

const jwtMiddleware = require('middlewares/jwt.middleware')

const authenticateRoutes = require('modules/authenticate/authenticate.route')
const chatRoutes = require('modules/chat/chat.router')
const roomRoutes = require('modules/room/room.route')
const cardRoutes = require('modules/card/card.route')

router.use('/authenticate', authenticateRoutes)
router.use('/chat', jwtMiddleware, chatRoutes)
router.use('/rooms', jwtMiddleware, roomRoutes)
router.use('/cards', jwtMiddleware, cardRoutes)

module.exports = router
