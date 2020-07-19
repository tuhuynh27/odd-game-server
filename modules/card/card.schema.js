const Joi = require('@hapi/joi')
const validateMiddleware = require('utils/handlers/validate.middleware')

const createCardSchema = Joi.object({
  text: Joi.string()
    .min(3)
    .required(),
  color: Joi.string()
    .min(1)
    .required(),
  language: Joi.string()
    .min(1)
    .required(),
  gaps: Joi.number()
    .min(1)
    .max(2)
})

const createCardValidator = validateMiddleware(createCardSchema)

module.exports = { createCardValidator }
