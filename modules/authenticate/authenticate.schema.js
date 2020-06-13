const Joi = require('@hapi/joi')
const validateMiddleware = require('utils/handlers/validate.middleware')

const registerUserNameSchema = Joi.object({
  userName: Joi.string()
    .min(3)
    .required()
})

const registerUserNameValidator = validateMiddleware(registerUserNameSchema)

module.exports = { registerUserNameValidator }
