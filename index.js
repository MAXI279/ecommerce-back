const express = require('express')
const rutasApi = require('./routes')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', rutasApi)

app.all('*', (req, res) => {
  return res.status(404).json({
    status: 404,
    message: 'Not found'
  })
})

module.exports = app
