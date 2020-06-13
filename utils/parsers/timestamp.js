const createdTimestamp = () => ({
  createdAt: new Date().getTime() / 1000,
  updatedAt: null
})

const updatedTimestamp = () => ({
  updatedAt: new Date().getTime() / 1000
})

module.exports = { createdTimestamp, updatedTimestamp }
