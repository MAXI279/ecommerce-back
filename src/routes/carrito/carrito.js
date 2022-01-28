const Router = require('express')
const { postCarrito, deleteCarritoById, getProductosCarritoById, postProductosCarritoById, deleteProdCarritoById } = require('../../controllers/carritos')
const router = Router()

router.post('/', postCarrito)
router.delete('/:id', deleteCarritoById)
router.get('/:id/productos', getProductosCarritoById)
router.post('/:id/productos', postProductosCarritoById)
router.delete('/:id/productos/:id_prod', deleteProdCarritoById)

module.exports = router
