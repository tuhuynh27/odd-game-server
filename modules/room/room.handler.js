const errorHandler = require('utils/handlers/error.handler')

const getRooms = async (req, res) => {
  const { country } = req.params
  const mockData = country === 'en' ? new Array(26).fill(null).map((_, i) => ({
    id: i,
    name: `Room ${i}`,
    host: `Player${(i % 3) + 1}`,
    total: 10,
    current: Math.floor(Math.random() * 10),
    viewers: Math.floor(Math.random() * 15),
    status: Math.floor(Math.random() * 3)
  })) : new Array(26).fill(null).map((_, i) => ({
    id: i + 26,
    name: `Phòng ${i}`,
    host: `Player${(i % 3) + 1}`,
    total: 10,
    current: Math.floor(Math.random() * 10),
    viewers: Math.floor(Math.random() * 15),
    status: Math.floor(Math.random() * 3)
  }))
  res.send(mockData)
}

module.exports = errorHandler({ getRooms })
