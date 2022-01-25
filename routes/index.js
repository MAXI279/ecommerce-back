const { Router } = require('express')
const routerProductos = require('./productos/productos')
const routerCarrito = require('./carrito/carrito')

const router = Router()

router.use('/productos', routerProductos)

router.use('/carrito', routerCarrito)

module.exports = router
