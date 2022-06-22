const Router = require('express')
// const { postCarrito, deleteCarritoById, getProductosCarritoById, postProductosCarritoById, deleteProdCarritoById, getCarritoByUserId } = require('../../controllers/carritos')

const { carritosController } = require('../../controllers/index')

const router = Router()

router.post('/', (req, res, next) => carritosController.postCarrito(req, res, next))
router.delete('/:id', (req, res, next) => carritosController.deleteCarritoById(req, res, next))
router.get('/:id/productos', (req, res, next) => carritosController.getProductosCarritoById(req, res, next))
router.get('/usuario/:id', (req, res, next) => carritosController.getCarritoByUserId(req, res, next))
router.post('/:id/productos', (req, res, next) => carritosController.postProductosCarritoById(req, res, next))
router.delete('/:id/productos/:id_prod', (req, res, next) => carritosController.deleteProdCarritoById(req, res, next))

module.exports = router
