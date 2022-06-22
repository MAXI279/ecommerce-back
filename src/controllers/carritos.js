
const CarritosService = require('../services/CarritosService')

class CarritosController {
  constructor () {
    this.carritosService = new CarritosService()
  }

  async postCarrito (req, res, next) {
    try {
      const carrito = await this.carritosService.guardar(req.body)
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

  async deleteCarritoById (req, res, next) {
    try {
      const { id } = req.params
      const carrito = await this.carritosService.eliminar(id)
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

  async getProductosCarritoById (req, res, next) {
    try {
      const { id } = req.params
      const carritoProductos = await this.carritosService.listarProductosPorId(id)
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

  async getCarritoByUserId (req, res, next) {
    try {
      const { id } = req.params
      const carrito = await this.carritosService.listarPorUserId(id)
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

  async postProductosCarritoById (req, res, next) {
    try {
      const { id } = req.params
      const carrito = await this.carritosService.agregarProducto(req.body, id)
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

  async deleteProdCarritoById (req, res, next) {
    try {
      // eslint-disable-next-line camelcase
      const { id, id_prod } = req.params
      const carrito = await this.carritosService.eliminarProducto(id, id_prod)
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
}

module.exports = CarritosController
