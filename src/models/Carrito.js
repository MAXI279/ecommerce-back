const mongoose = require('mongoose')

const CarritoSchema = new mongoose.Schema({
  productos: [],
  timestamp: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('Carrito', CarritoSchema)
