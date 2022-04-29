
// const Carrito = require('../models/carritos')
// const carritos = new Carrito('./src/data/carritos.json')
const { carritosDao } = require('../models/index')
const carritos = carritosDao
const { productosDao } = require('../models/index')
const productos = productosDao

const postCarrito = async (req, res, next) => {
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
    next(error)
  }
}

const deleteCarritoById = async (req, res, next) => {
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
    next(error)
  }
}

const getProductosCarritoById = async (req, res, next) => {
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
    next(error)
  }
}

const getCarritoByUserId = async (req, res, next) => {
  try {
    const { id } = req.params
    const carrito = await carritos.listarPorUserId(id)
    if (carrito.error) {
      return res.json({
        status: 400,
        error: 'Carrito no encontrado'
      })
    }
    return res.json({
      status: 200,
      body: carrito
    })
  } catch (error) {
    next(error)
  }
}

const postProductosCarritoById = async (req, res, next) => {
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
    next(error)
  }
}

const agregarProductoCarritoById = async (req, res, next) => {
  try {
    // eslint-disable-next-line camelcase
    const { id, id_prod } = req.params
    const producto = await productos.listarPorId(id_prod)
    if (producto.error) {
      return res.json({
        status: 400,
        error: producto.error
      })
    }
    const { nombre, descripcion, codigo, foto, precio, stock } = producto
    const carrito = await carritos.agregarProducto({ nombre, descripcion, codigo, foto, precio, stock }, id)
    if (carrito.error) {
      return res.json({
        status: 400,
        error: carrito.error
      })
    }

    return res.redirect('/')
    // return res.json({
    //   status: 200,
    //   body: carrito
    // })
  } catch (error) {
    next(error)
  }
}

const deleteProdCarritoById = async (req, res, next) => {
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
    next(error)
  }
}

module.exports = {
  postCarrito,
  deleteCarritoById,
  getProductosCarritoById,
  getCarritoByUserId,
  postProductosCarritoById,
  agregarProductoCarritoById,
  deleteProdCarritoById
}
