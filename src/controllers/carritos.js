
const Carrito = require('../models/carritos')
const carritos = new Carrito('./src/data/carritos.json')

const postCarrito = async (req, res) => {
  try {
    const carrito = await carritos.guardar(req.body)
    if (carrito.error) {
      return res.json({
        status: 400,
        error: carrito.error
      })
    }
    return res.json({
      status: 200,
      body: carrito
    })
  } catch (error) {
    return res.sendStatus(500)
  }
}

const deleteCarritoById = async (req, res) => {
  try {
    const { id } = req.params
    const carrito = await carritos.eliminar(id)
    if (carrito.error) {
      return res.json({
        status: 400,
        error: carrito.error
      })
    }
    return res.sendStatus(200)
  } catch (error) {
    return res.sendStatus(500)
  }
}

const getProductosCarritoById = async (req, res) => {
  try {
    const { id } = req.params
    const carritoProductos = await carritos.listarProductosPorId(id)
    if (carritoProductos.error) {
      return res.json({
        status: 400,
        error: 'Carrito no encontrado'
      })
    }
    return res.json({
      status: 200,
      body: carritoProductos.productos
    })
  } catch (error) {
    return res.sendStatus(500)
  }
}

const postProductosCarritoById = async (req, res) => {
  try {
    const { id } = req.params
    const carrito = await carritos.agregarProducto(req.body, id)
    if (carrito.error) {
      return res.json({
        status: 400,
        error: carrito.error
      })
    }
    return res.json({
      status: 200,
      body: carrito
    })
  } catch (error) {
    return res.sendStatus(500)
  }
}

const deleteProdCarritoById = async (req, res) => {
  try {
    // eslint-disable-next-line camelcase
    const { id, id_prod } = req.params
    const carrito = await carritos.eliminarProducto(id, id_prod)
    if (carrito.error) {
      return res.json({
        status: 400,
        error: carrito.error
      })
    }
    return res.sendStatus(200)
  } catch (error) {
    return res.sendStatus(500)
  }
}

module.exports = {
  postCarrito,
  deleteCarritoById,
  getProductosCarritoById,
  postProductosCarritoById,
  deleteProdCarritoById
}
