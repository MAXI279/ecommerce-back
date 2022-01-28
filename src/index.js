const express = require('express')
const rutasApi = require('./routes')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', rutasApi)

app.all('*', (req, res) => {
  return res.status(404).json({
    error: -2,
    descripcion: `ruta ${req.url} método ${req.method} no implementada`
  })
})

module.exports = app
