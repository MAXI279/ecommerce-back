const Router = require('express')
const { getProductos, postProducto, putProductoById, deleteProductoById } = require('../../controllers/productos')
const isAdmin = require('../../middlewares/is-admin')
const router = Router()

router.get('/:id?', getProductos)
router.post('/', isAdmin, postProducto)
router.put('/:id', isAdmin, putProductoById)
router.delete('/:id', isAdmin, deleteProductoById)

module.exports = router
