const express = require('express')
const router = express.Router()

const { getChats } = require('modules/chat/chat.handler')

router.route('/').get(getChats)

module.exports = router
