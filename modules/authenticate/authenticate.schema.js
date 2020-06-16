const Joi = require('@hapi/joi')
const validateMiddleware = require('utils/handlers/validate.middleware')

const registerusernameSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .required()
})

const registerusernameValidator = validateMiddleware(registerusernameSchema)

module.exports = { registerusernameValidator }
