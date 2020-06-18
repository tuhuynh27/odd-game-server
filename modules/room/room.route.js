const express = require('express')
const router = express.Router()

const { createRoomValidator } = require('modules/room/room.schema')
const { createRoom, getRooms } = require('modules/room/room.handler')

router.route('/:country').get(getRooms)
router.route('/:country').post(createRoomValidator, createRoom)

module.exports = router
