
const Producto = require('../models/productos')
const productos = new Producto('./src/data/productos.json')

const getProductos = async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.json({
      status: 200,
      body: await productos.listarTodos()
    })
  }
  return getProductoById(req, res)
}

const getProductoById = async (req, res) => {
  try {
    const { id } = req.params
    const producto = await productos.listarPorId(id)
    if (producto.error) {
      return res.json({
        status: 400,
        error: 'Producto no encontrado'
      })
    }
    return res.json({
      status: 200,
      body: producto
    })
  } catch (error) {
    return res.sendStatus(500)
  }
}

const postProducto = async (req, res) => {
  try {
    const producto = await productos.guardar(req.body)
    if (producto.error) {
      return res.json({
        status: 400,
        error: producto.error
      })
    }
    return res.json({
      status: 200,
      body: producto
    })
  } catch (error) {
    return res.sendStatus(500)
  }
}

const putProductoById = async (req, res) => {
  try {
    const { id } = req.params
    const producto = await productos.actualizar(req.body, id)
    if (producto.error) {
      return res.json({
        status: 400,
        error: producto.error
      })
    }
    return res.json({
      status: 200,
      body: producto
    })
  } catch (error) {
    return res.sendStatus(500)
  }
}

const deleteProductoById = async (req, res) => {
  try {
    const { id } = req.params
    const producto = await productos.eliminar(id)
    if (producto.error) {
      return res.json({
        status: 400,
        error: producto.error
      })
    }
    return res.sendStatus(200)
  } catch (error) {
    return res.sendStatus(500)
  }
}

module.exports = {
  getProductos,
  getProductoById,
  postProducto,
  putProductoById,
  deleteProductoById
}
