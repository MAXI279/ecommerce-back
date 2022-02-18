const mongoose = require('mongoose')

const ProductoSchema = new mongoose.Schema({
  codigo: {
    type: Number,
    required: [true, 'Please provide codigo']
  },
  nombre: {
    type: String,
    required: [true, 'Please provide nombre']
  },
  descripcion: {
    type: String,
    required: [true, 'Please provide descripcion']
  },
  foto: {
    type: String,
    required: [true, 'Please provide foto']
  },
  precio: {
    type: Number,
    required: [true, 'Please provide precio']
  },
  stock: {
    type: Number,
    default: 0
  },
  timestamp: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('Producto', ProductoSchema)
