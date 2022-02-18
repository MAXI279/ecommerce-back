const { mongoDbConnection } = require('../../config/configMongo')
mongoDbConnection()

class ContenedorMongoDb {
  constructor (schema) {
    this.schema = schema
  }

  async getAll () {
    try {
      const data = await this.schema.find()
      return data // JSON.parse(data)
    } catch (error) {
      throw console.log(`Hubo un error: ${error}`)
    }
  }

  async getById (id) {
    try {
      const element = await this.schema.findById(id)
      if (!element) {
        return null
      } else {
        return element
      }
    } catch (error) {
      console.log('No se encontro el elemento', error)
    }
  }

  async deleteAll () {
    try {
      await this.schema.deleteMany({})
    } catch (error) {
      console.log('No se pudieron eliminar todos los elementos de la coleccion', error)
    }
  }

  async deleteById (id) {
    try {
      return await this.schema.deleteOne({ _id: id })
    } catch (error) {
      console.log(`No se pudo eliminar el elemento con id ${id}`, error)
    }
  }

  async save (obj) {
    try {
      return await this.schema.create(obj)
    } catch (error) {
      console.log('No se pudo insertar el elemento', error)
      return -1
    }
  }

  async update (obj, id) {
    try {
      return this.schema.updateOne({ _id: id }, { $set: obj })
    } catch (error) {
      console.log('No se pudo actualizar el elemento', error)
      return -1
    }
  }
}

module.exports = ContenedorMongoDb
