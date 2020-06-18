const Joi = require('@hapi/joi')
const validateMiddleware = require('utils/handlers/validate.middleware')

const createRoomSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .required()
})

const createRoomValidator = validateMiddleware(createRoomSchema)

module.exports = { createRoomValidator }
