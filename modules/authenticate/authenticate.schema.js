const Joi = require('@hapi/joi')
const validateMiddleware = require('utils/handlers/validate.middleware')

const registerUsernameSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .required()
})

const registerUsernameValidator = validateMiddleware(registerUsernameSchema)

module.exports = { registerUsernameValidator }
