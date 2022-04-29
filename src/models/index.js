const env = require('../config/env.config')

/* eslint-disable no-case-declarations */
let productosDao
let carritosDao

switch (env.DATASOURCE) {
  case 'mongodb':
    const ProductosDaoMongo = require('../models/daos/ProductosDaoMongo')
    const CarritosDaoMongo = require('../models/daos/CarritosDaoMongo')
    productosDao = new ProductosDaoMongo()
    carritosDao = new CarritosDaoMongo()
    break
  case 'firebase':
    const ProductosDaoFirebase = require('../models/daos/ProductosDaoFirebase')
    const CarritosDaoFirebase = require('../models/daos/CarritosDaoFirebase')
    productosDao = new ProductosDaoFirebase()
    carritosDao = new CarritosDaoFirebase()
    break
  default:
}

module.exports = { productosDao, carritosDao }
