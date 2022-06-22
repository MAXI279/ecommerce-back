const Router = require('express')
// const { getProductos, postProducto, putProductoById, deleteProductoById } = require('../../controllers/productos')

const { productosController } = require('../../controllers/index')

const isAdmin = require('../../middlewares/is-admin')
const router = Router()

router.get('/:id?', (req, res, next) => productosController.getProductos(req, res, next))
router.post('/', isAdmin, (req, res, next) => productosController.postProducto(req, res, next))
router.put('/:id', isAdmin, (req, res, next) => productosController.putProductoById(req, res, next))
router.delete('/:id', isAdmin, (req, res, next) => productosController.deleteProductoById(req, res, next))

module.exports = router
