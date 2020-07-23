const express = require('express')
const router = express.Router()

const { getCards } = require('modules/card/card.handler')

router.route('/:language').get(getCards)

module.exports = router
