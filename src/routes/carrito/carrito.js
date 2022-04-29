const Router = require('express')
const { postCarrito, deleteCarritoById, getProductosCarritoById, postProductosCarritoById, agregarProductoCarritoById, deleteProdCarritoById, getCarritoByUserId } = require('../../controllers/carritos')
const router = Router()

router.post('/', postCarrito)
router.delete('/:id', deleteCarritoById)
router.get('/:id/productos', getProductosCarritoById)
router.get('/usuario/:id', getCarritoByUserId)
router.post('/:id/productos', postProductosCarritoById)
router.get('/:id/producto/:id_prod', agregarProductoCarritoById)
router.delete('/:id/productos/:id_prod', deleteProdCarritoById)

module.exports = router
