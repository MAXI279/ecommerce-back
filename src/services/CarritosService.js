const CarritosFactoryDAO = require('../models/daos/factories/CarritosFactoryDAO') // Data Access Layer
const env = require('../config/env.config')

class CarritosService {
  constructor () {
    this.carritosDao = CarritosFactoryDAO.get(env.DATASOURCE)
  }

  async listarTodos () {
    return await this.carritosDao.listarTodos()
  }

  async listarPorId (id) {
    return await this.carritosDao.listarPorId(id)
  }

  async listarPorUserId (id) {
    return await this.carritosDao.listarPorUserId(id)
  }

  async listarProductosPorId (id) {
    return await this.carritosDao.listarProductosPorId(id)
  }

  async agregarProducto (prod, idCarrito) {
    return await this.carritosDao.agregarProducto(prod, idCarrito)
  }

  async eliminarProducto (idCarrito, idProd) {
    return await this.carritosDao.eliminarProducto(idCarrito, idProd)
  }

  async guardar (product) {
    return await this.carritosDao.guardar(product)
  }

  async actualizar (product, id) {
    return await this.carritosDao.actualizar(product, id)
  }

  async eliminar (id) {
    return await this.carritosDao.eliminar(id)
  }
}

module.exports = CarritosService
