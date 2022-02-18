require('dotenv').config()
const app = require('./index')

const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
  console.log(`Servidor online en puerto ${PORT}`)
})

server.on('error', (error) => {
  console.log(`Ha ocurrido un error, ${error.message}`)
})
