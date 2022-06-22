const ProductosService = require('../services/ProductosService')

class ProductosController {
  constructor () {
    this.productosService = new ProductosService()
  }

  async getProductos (req, res, next) {
    try {
      const { id } = req.params
      if (!id) {
        return res.json({
          status: 200,
          body: await this.productosService.listarTodos()
        })
      }
      return this.getProductoById(req, res, next)
    } catch (error) {
      next(error)
    }
  }

  async getProductoById (req, res, next) {
    try {
      const { id } = req.params
      const producto = await this.productosService.listarPorId(id)
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
      next(error)
    }
  }

  async postProducto (req, res, next) {
    try {
      const producto = await this.productosService.guardar(req.body)
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
      next(error)
    }
  }

  async putProductoById (req, res, next) {
    try {
      const { id } = req.params
      const producto = await this.productosService.actualizar(req.body, id)
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
      next(error)
    }
  }

  async deleteProductoById (req, res, next) {
    try {
      const { id } = req.params
      const producto = await this.productosService.eliminar(id)
      if (producto.error) {
        return res.json({
          status: 400,
          error: producto.error
        })
      }
      return res.sendStatus(200)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ProductosController
