const mongoose = require('mongoose')

const mongoDbConnection = async () => {
  try {
    // eslint-disable-next-line no-undef
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.info('[mongodb] MongoDB conectado')
  } catch (error) {
    console.log(error)
    throw new Error('No se puede conectar a la base de datos Mongo')
  }
}

module.exports = {
  mongoDbConnection
}

/*
const knex = require('knex')

const config = {
  client: 'sqlite3',
  connection: {
    filename: './data/ecommerce.sqlite'
  },
  useNullAsDefault: true
}

const configMariaDB = {
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'api'
  },
  useNullAsDefault: true
}

module.exports = {
  knexSqlite3: knex(config),
  knexMariaDB: knex(configMariaDB),
  chatTable: 'mensajes',
  prodTable: 'productos'
}
*/
