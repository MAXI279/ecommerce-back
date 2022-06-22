const ProductosFactoryDAO = require('../models/daos/factories/ProductosFactoryDAO') // Data Access Layer
const env = require('../config/env.config')

class ProductosService {
  constructor () {
    this.productosDao = ProductosFactoryDAO.get(env.DATASOURCE)
  }

  async listarTodos () {
    return await this.productosDao.listarTodos()
  }

  async listarPorId (id) {
    return await this.productosDao.listarPorId(id)
  }

  async guardar (product) {
    return await this.productosDao.guardar(product)
  }

  async actualizar (product, id) {
    return await this.productosDao.actualizar(product, id)
  }

  async eliminar (id) {
    return await this.productosDao.eliminar(id)
  }
}

module.exports = ProductosService
