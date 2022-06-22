const express = require('express')
const { login, getSignUp, getLogout, getFailsignup, getFaillogin, postEnviarCarrito, agregarProductoCarritoById } = require('../controllers/web')
const checkAuthentication = require('../middlewares/auth.middleware')
const sendEmailOnNewSignUp = require('../middlewares/email-new-user.middleware')

const passport = require('../middlewares/passport')
const uploadFileMiddleware = require('../middlewares/upload.middleware')

const router = express.Router()

router.use(express.urlencoded({ extended: true }))

router.get('/', checkAuthentication, login) // ex: getLogin

router.get('/register', getSignUp)

router.get('/logout', getLogout)

router.post('/login', passport.authenticate('signin', { failureRedirect: '/faillogin' }), login)

router.get('/faillogin', getFaillogin)

router.post('/signup', [
  uploadFileMiddleware,
  sendEmailOnNewSignUp,
  passport.authenticate('signup', { failureRedirect: '/failsignup', successRedirect: '/' })
])

router.get('/failsignup', getFailsignup)

router.get('/login', checkAuthentication, login) // ex: getLogin

router.post('/enviar-carrito', postEnviarCarrito)

router.get('/:id/producto/:id_prod', agregarProductoCarritoById)

module.exports = router
