const express = require('express')
const router = express.Router()

const { createRoomValidator } = require('modules/room/room.schema')
const { createRoom, getRooms, getRoomChat } = require('modules/room/room.handler')

router.route('/:country').get(getRooms)
router.route('/:country').post(createRoomValidator, createRoom)
router.route('/:slug/chat').get(getRoomChat)

module.exports = router
