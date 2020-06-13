const express = require('express')
const router = express.Router()

const { getRooms } = require('modules/room/room.handler')

router.route('/:country').get(getRooms)

module.exports = router
