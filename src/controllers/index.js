const ProductosController = require('./productos')
const CarritosController = require('./carritos')

const productosController = new ProductosController()
const carritosController = new CarritosController()

module.exports = { productosController, carritosController }
