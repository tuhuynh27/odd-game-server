const Joi = require('@hapi/joi')
const validateMiddleware = require('utils/handlers/validate.middleware')

const createRoomSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .required(),
  size: Joi.number()
    .min(1)
    .max(20)
})

const createRoomValidator = validateMiddleware(createRoomSchema)

module.exports = { createRoomValidator }
