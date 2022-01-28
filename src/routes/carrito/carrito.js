const Router = require('express')
const { postCarrito, deleteCarritoById, getProductosCarritoById, postProductosCarritoById } = require('../../controllers/carritos')
const router = Router()

router.post('/', postCarrito)
router.delete('/:id', deleteCarritoById)
router.get('/:id/productos', getProductosCarritoById)
router.post('/:id/productos', postProductosCarritoById)

module.exports = router
