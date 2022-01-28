const Contenedor = require('../utils/manejo-archivos')

class Carrito {
  constructor (rutaPersistencia) {
    this.carritos = new Contenedor(rutaPersistencia)
  }

  async listarTodos () {
    return await this.carritos.getAll()
  }

  async listarPorId (id) {
    const producto = await this.carritos.getById(id)
    return producto || { error: `Producto con id ${id} no encontrado!` }
  }

  async listarProductosPorId (id) {
    const productos = await this.carritos.getById(id)
    return productos || { error: `Carrito con id ${id} no encontrado!` }
  }

  async guardar (prod) {
    let { productos } = prod
    if (!productos) { productos = [] }

    const nuevoCarrito = { timestamp: Date.now(), productos }
    const idCarrito = await this.carritos.save(nuevoCarrito)
    return idCarrito
  }

  async agregarProducto (prod, idCarrito) {
    const { nombre, descripcion, codigo, foto, precio, stock } = prod
    if (!nombre || !descripcion || !codigo || !foto || !precio || !stock) return { error: 'Nombre, descripcion, codigo, foto, precio y stock son campos obligatorios' }
    if (precio < 0 || isNaN(precio)) return { error: 'El precio debe ser un número positivo' }

    const carrito = await this.carritos.getById(idCarrito)
    if (!carrito) return { error: `Carrito con id ${idCarrito} no encontrado!` }

    const ultimoId = carrito.productos.length === 0 ? 1 : Math.max(...carrito.productos.map(prod => prod.id)) + 1

    const nuevoProducto = { ...prod, id: ultimoId }
    carrito.productos.push(nuevoProducto)
    const { id, ...carritoSinId } = carrito

    const carritoUpdated = await this.carritos.update(carritoSinId, idCarrito)
    if (carritoUpdated === -1) return { error: `Error al actualizar carrito con id: ${idCarrito} !` }
    return carrito
  }

  async actualizar (prod, id) {
    const producto = await this.carritos.update(prod, id)
    if (!producto) return { error: `Producto con id ${id} no encontrado!` }
    if (producto === -1) return { error: `Error al actualizar producto con id: ${id} !` }
    return producto
  }

  async eliminar (id) {
    const idEliminado = await this.carritos.deleteById(id)
    if (!idEliminado) return { error: `Carrito con id ${id} no encontrado!` }
    return idEliminado
  }

  async eliminarProducto (idCarrito, idProd) {
    const carrito = await this.carritos.getById(idCarrito)
    if (!carrito) return { error: `Carrito con id ${idCarrito} no encontrado!` }
    if (!carrito.productos.find(prd => prd.id === +idProd)) return { error: `Id producto con id ${idProd} no encontrado en carrito!` }
    carrito.productos = carrito.productos.filter(prd => prd.id !== +idProd)
    const { id, ...carritoSinId } = carrito

    const carritoUpdated = await this.carritos.update(carritoSinId, idCarrito)
    if (carritoUpdated === -1) return { error: `Error al actualizar carrito con id: ${idCarrito} !` }
    return carrito
  }
}

module.exports = Carrito
