const ContenedorMongoDb = require('../contenedores/ContenedorMongoDb')
const User = require('../User')

class UserDaoMongo extends ContenedorMongoDb {
  constructor () {
    super(User)
  }

  async listarTodos () {
    return await this.getAll()
  }

  async listarPorId (id) {
    const user = await this.getById(id)
    return user || { error: `Usuario con id ${id} no encontrado!` }
  }

  async listarPorEmail (email) {
    const document = await this.getByEmail(email)
    return document || { error: 'Wrong username or password' }
  }

  async guardar (user) {
    const { nombre, email, password } = user
    if (!nombre || !email || !password) return { error: 'Nombre, email y password son campos obligatorios' }

    return await this.save(user)
    // return user
  }

  async actualizar (user, id) {
    const usuario = await this.update(user, id)
    if (!usuario) return { error: `Usuario con id ${id} no encontrado!` }
    if (usuario === -1) return { error: `Error al actualizar Usuario con id: ${id} !` }
    return usuario
  }

  async eliminar (id) {
    const idEliminado = await this.deleteById(id)
    if (!idEliminado) return { error: `Usuario con id ${id} no encontrado!` }
    return idEliminado
  }
}

module.exports = UserDaoMongo
