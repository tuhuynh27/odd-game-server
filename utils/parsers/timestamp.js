const createdTimestamp = () => ({
  createdAt: new Date().toISOString(),
  updatedAt: null
})

const updatedTimestamp = () => ({
  updatedAt: new Date().toISOString()
})

module.exports = { createdTimestamp, updatedTimestamp }
