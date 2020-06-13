const express = require('express')
const router = express.Router()

const authenticateRoutes = require('modules/authenticate/authenticate.route')
const chatRoutes = require('modules/chat/chat.router')
const roomRoutes = require('modules/room/room.route')

router.use('/authenticate', authenticateRoutes)
router.use('/chat', chatRoutes)
router.use('/rooms', roomRoutes)

module.exports = router
