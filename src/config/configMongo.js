const mongoose = require('mongoose')
const env = require('./env.config')
const logger = require('../logs')

const mongoDbConnection = async () => {
  try {
    // eslint-disable-next-line no-undef
    await mongoose.connect(env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    logger.info('[mongodb] MongoDB conectado')
  } catch (error) {
    logger.error('No se puede conectar a la base de datos Mongo')
  }
}

module.exports = {
  mongoDbConnection
}
