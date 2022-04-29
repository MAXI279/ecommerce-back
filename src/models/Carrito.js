const mongoose = require('mongoose')

const CarritoSchema = new mongoose.Schema({
  productos: [],
  timestamp: {
    type: Date,
    default: Date.now()
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = mongoose.model('Carrito', CarritoSchema)
