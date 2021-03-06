const ContenedorFirebase = require('../contenedores/ContenedorFirebase')
const firebaseConnection = require('../../config/configFirebase')
const coleccion = 'carritos'

class CarritosDaoFirebase extends ContenedorFirebase {
  constructor () {
    super(firebaseConnection(), coleccion)
  }

  async listarTodos () {
    return await this.getAll()
  }

  async listarPorId (id) {
    const carrito = await this.getById(id)
    return carrito || { error: `Carrito con id ${id} no encontrado!` }
  }

  async listarProductosPorId (id) {
    const carrito = await this.getById(id)
    return carrito || { error: `Carrito con id ${id} no encontrado!` }
  }

  async guardar (prod) {
    let { productos } = prod
    if (!productos) { productos = [] }

    const nuevoCarrito = { timestamp: Date.now(), productos }
    const idCarrito = await this.save(nuevoCarrito)
    return idCarrito.id
  }

  async agregarProducto (prod, idCarrito) {
    const { nombre, descripcion, codigo, foto, precio, stock } = prod
    if (!nombre || !descripcion || !codigo || !foto || !precio || !stock) return { error: 'Nombre, descripcion, codigo, foto, precio y stock son campos obligatorios' }
    if (precio < 0 || isNaN(precio)) return { error: 'El precio debe ser un número positivo' }

    const carrito = await this.getById(idCarrito)
    if (!carrito) return { error: `Carrito con id ${idCarrito} no encontrado!` }

    const ultimoId = carrito.productos.length === 0 ? 1 : Math.max(...carrito.productos.map(prod => prod.id)) + 1

    const nuevoProducto = { ...prod, id: ultimoId }
    carrito.productos.push(nuevoProducto)
    const { id, ...carritoSinId } = carrito

    const carritoUpdated = await this.update(carritoSinId, idCarrito)
    if (carritoUpdated === -1) return { error: `Error al actualizar carrito con id: ${idCarrito} !` }
    return carrito
  }

  async actualizar (prod, id) {
    const carrito = await this.update(prod, id)
    if (!carrito) return { error: `carrito con id ${id} no encontrado!` }
    if (carrito === -1) return { error: `Error al actualizar carrito con id: ${id} !` }
    return carrito
  }

  async eliminar (id) {
    const idEliminado = await this.deleteById(id)
    if (!idEliminado) return { error: `Carrito con id ${id} no encontrado!` }
    return idEliminado
  }

  async eliminarProducto (idCarrito, idProd) {
    const carrito = await this.getById(idCarrito)
    if (!carrito) return { error: `Carrito con id ${idCarrito} no encontrado!` }
    if (!carrito.productos.find(prd => prd.id === +idProd)) return { error: `Id producto con id ${idProd} no encontrado en carrito!` }
    carrito.productos = carrito.productos.filter(prd => prd.id !== +idProd)
    const { id, ...carritoSinId } = carrito

    const carritoUpdated = await this.update(carritoSinId, idCarrito)
    if (carritoUpdated === -1) return { error: `Error al actualizar carrito con id: ${idCarrito} !` }
    return carrito
  }
}

module.exports = CarritosDaoFirebase
