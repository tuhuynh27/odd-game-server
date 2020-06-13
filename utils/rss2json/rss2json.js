const axios = require('axios')
const key = 'qwootokowuhhanmx1rmtfyzcfkgkka8typmv18pa'

const getFeed = async url => {
  const { data } = await axios.get(
    `https://api.rss2json.com/v1/api.json?rss_url=${url}?api_key=${key}`
  )
  return data.items || []
}

module.exports = getFeed
