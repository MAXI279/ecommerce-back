const Contenedor = require('../utils/manejo-archivos')

class Producto {
  constructor (rutaPersistencia) {
    this.productos = new Contenedor(rutaPersistencia)
  }

  async listarTodos () {
    return await this.productos.getAll()
  }

  async listarPorId (id) {
    const producto = await this.productos.getById(id)
    return producto || { error: `Producto con id ${id} no encontrado!` }
  }

  async guardar (prod) {
    const { nombre, descripcion, codigo, foto, precio, stock } = prod
    if (!nombre || !descripcion || !codigo || !foto || !precio || !stock) return { error: 'Nombre, descripcion, codigo, foto, precio y stock son campos obligatorios' }
    if (precio < 0 || isNaN(precio)) return { error: 'El precio debe ser un número positivo' }

    const nuevoProducto = { ...prod, timestamp: Date.now() }
    await this.productos.save(nuevoProducto)
    return nuevoProducto
  }

  async actualizar (prod, id) {
    const producto = await this.productos.update(prod, id)
    if (!producto) return { error: `Producto con id ${id} no encontrado!` }
    if (producto === -1) return { error: `Error al actualizar producto con id: ${id} !` }
    return producto
  }

  async eliminar (id) {
    const idEliminado = await this.productos.deleteById(id)
    if (!idEliminado) return { error: `Producto con id ${id} no encontrado!` }
    return idEliminado
  }
}

module.exports = Producto
