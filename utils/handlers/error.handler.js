const errorHandler = fn => (req, res, next) => {
  const routePromise = fn(req, res, next)
  routePromise.catch && routePromise.catch(err => next(err))
}

const addErrorHandlerWrapper = handlers => {
  const handlersArr = Object.keys(handlers).map(key => ({
    key: key,
    value: errorHandler(handlers[key])
  }))

  return handlersArr.reduce(
    (obj, item) => ((obj[item.key] = item.value), obj),
    Object.create(null)
  )
}

module.exports = addErrorHandlerWrapper
