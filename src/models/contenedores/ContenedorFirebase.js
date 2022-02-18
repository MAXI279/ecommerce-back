
class ContenedorFirebase {
  constructor (db, coleccion) {
    this.coleccion = db.collection(coleccion)
  }

  async getAll () {
    try {
      const data = await this.coleccion.get()
      const docs = data.docs
      const response = docs.map(doc => ({
        id: doc.id, ...doc.data()
      }))
      return response
    } catch (error) {
      throw console.log(`Hubo un error: ${error}`)
    }
  }

  async getById (id) {
    try {
      const doc = this.coleccion.doc(id)
      const item = await doc.get()
      const response = {
        id: item.id, ...item.data()
      }
      if (!item.data()) {
        return null
      } else {
        return response
      }
    } catch (error) {
      console.log('No se encontro el elemento', error)
    }
  }

  async deleteAll () {
    try {
      await this.coleccion.delete()
    } catch (error) {
      console.log('No se pudieron eliminar todos los elementos de la coleccion', error)
    }
  }

  async deleteById (id) {
    try {
      return await this.coleccion.doc(id).delete()
    } catch (error) {
      console.log(`No se pudo eliminar el elemento con id ${id}`, error)
    }
  }

  async save (obj) {
    try {
      return await this.coleccion.add(obj)
    } catch (error) {
      console.log('No se pudo insertar el elemento', error)
      return -1
    }
  }

  async update (obj, id) {
    try {
      return this.coleccion.doc(id).update(obj)
    } catch (error) {
      console.log('No se pudo actualizar el elemento', error)
      return -1
    }
  }
}

module.exports = ContenedorFirebase
