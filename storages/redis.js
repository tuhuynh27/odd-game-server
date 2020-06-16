const redis = require('redis')

let client = null

const initRedis = () => {
  client = redis.createClient()
}

const redisGet = key => new Promise((resolve, reject) => {
  client.get(key, (error, value) => {
    if (error) {
      reject(error)
    }

    resolve(value)
  })
})

const redisSet = (key, value) => new Promise((resolve, reject) => {
  if (typeof value !== 'string' && typeof value !== 'number') {
    value = JSON.stringify(value)
  }

  client.set(key, value, (error, result) => {
    if (error) {
      reject(error)
    }

    resolve(result)
  })
})

const redisExpire = (key, time) => new Promise((resolve, reject) => {
  client.expire(key, time, (error, result) => {
    if (error) {
      reject(error)
    }

    resolve(result)
  })
})

module.exports = { initRedis, redisGet, redisSet, redisExpire }
