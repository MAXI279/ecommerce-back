
const { productosDao } = require('../models/index')
const productos = productosDao
const { carritosDao } = require('../models/index')
const carritos = carritosDao
const env = require('../config/env.config')
const enviarEmail = require('../utils/enviar-email')
// const getLogin = async (req, res, next) => {
//   try {
//     const listadoProd = await productos.listarTodos()
//     console.log(listadoProd)
//     const user = req.user
//     res.render('index', { listadoProd, foto: user.foto, nombre: user.nombre, email: user.email })
//   } catch (error) {
//     next(error)
//   }
// }

const login = async (req, res, next) => {
  try {
    let listadoProd = await productos.listarTodos()
    listadoProd = listadoProd.map(prod => ({ ...prod._doc, id: prod._id.toString() }))
    const user = req.user

    if (!req.session.nombre) {
      req.session.nombre = user.nombre
    }
    let carrito = await carritos.listarPorUserId(user._id.toString())
    if (carrito.error) {
      carrito = await carritos.guardar({ usuario: user._id.toString() })
    }

    res.render('index', { carritoId: carrito._id.toString(), carrito, listadoProd, foto: user.foto, nombre: user.nombre, email: user.email })
  } catch (error) {
    next(error)
  }
}

const postEnviarCarrito = async (req, res, next) => {
  try {
    const user = req.user
    const { carritoId } = req.body

    const carrito = await carritos.listarPorId(carritoId)
    if (carrito.error) {
      return res.json({
        status: 404,
        descripcion: carrito.error
      })
    }
    const message = 'Se ha creado nuevo pedido en el portal web'

    const productosAComprar = carrito.productos.map(prod => prod.nombre).join(' y ')

    enviarEmail({
      to: env.EMAIL_ADMIN,
      subject: `Nuevo Pedido de ${user.nombre} - ${user.email}`,
      html: `<h4> Hola! </h4>
      ${message}
      <p>Los productos adquiridos son: ${productosAComprar}</p>
      `
    })

    await carritos.deleteById(carritoId)

    res.redirect('/')
  } catch (error) {
    next(error)
  }
}

const getFaillogin = async (req, res) => {
  res.render('faillogin')
}

const getLogout = (req, res) => {
  const nombre = req.session?.nombre
  if (nombre) {
    req.session.destroy(err => {
      if (!err) {
        res.clearCookie('my-session')
        res.render('logout', { nombre: nombre })
      } else {
        res.clearCookie('my-session')
        res.redirect('/')
      }
    })
  } else {
    res.render('login')
  }
}

const getSignUp = (req, res) => {
  res.render('register')
}

const postSignUp = async (req, res, next) => {
  res.redirect('/')
}

const getFailsignup = async (req, res) => {
  res.render('failsignup')
}

module.exports = {
  login,
  getFaillogin,
  getLogout,
  getSignUp,
  postSignUp,
  getFailsignup,
  postEnviarCarrito
}
