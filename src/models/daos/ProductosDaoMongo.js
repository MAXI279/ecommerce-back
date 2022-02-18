const ContenedorMongoDb = require('../contenedores/ContenedorMongoDb')
const Producto = require('../Producto')

class ProductosDaoMongo extends ContenedorMongoDb {
  constructor () {
    super(Producto)
  }

  async listarTodos () {
    return await this.getAll()
  }

  async listarPorId (id) {
    const producto = await this.getById(id)
    return producto || { error: `Producto con id ${id} no encontrado!` }
  }

  async guardar (prod) {
    const { nombre, descripcion, codigo, foto, precio, stock } = prod
    if (!nombre || !descripcion || !codigo || !foto || !precio || !stock) return { error: 'Nombre, descripcion, codigo, foto, precio y stock son campos obligatorios' }
    if (precio < 0 || isNaN(precio)) return { error: 'El precio debe ser un número positivo' }

    const nuevoProducto = { ...prod, timestamp: Date.now() }
    await this.save(nuevoProducto)
    return nuevoProducto
  }

  async actualizar (prod, id) {
    const producto = await this.update(prod, id)
    if (!producto) return { error: `Producto con id ${id} no encontrado!` }
    if (producto === -1) return { error: `Error al actualizar producto con id: ${id} !` }
    return producto
  }

  async eliminar (id) {
    const idEliminado = await this.deleteById(id)
    if (!idEliminado) return { error: `Producto con id ${id} no encontrado!` }
    return idEliminado
  }
}

module.exports = ProductosDaoMongo
