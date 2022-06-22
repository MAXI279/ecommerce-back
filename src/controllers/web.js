const env = require('../config/env.config')
const enviarEmail = require('../utils/enviar-email')
const ProductosService = require('../services/ProductosService')
const productosService = new ProductosService()
const CarritosService = require('../services/CarritosService')
const carritosService = new CarritosService()

const login = async (req, res, next) => {
  try {
    let listadoProd = await productosService.listarTodos()
    listadoProd = listadoProd.map(prod => ({ ...prod._doc, id: prod._id.toString() }))
    const user = req.user

    if (!req.session.nombre) {
      req.session.nombre = user.nombre
    }
    let carrito = await carritosService.listarPorUserId(user._id.toString())
    if (carrito.error) {
      carrito = await carritosService.guardar({ usuario: user._id.toString() })
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

    const carrito = await carritosService.listarPorId(carritoId)
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

    await carritosService.deleteById(carritoId)

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

const agregarProductoCarritoById = async (req, res, next) => {
  try {
    // eslint-disable-next-line camelcase
    const { id, id_prod } = req.params
    const producto = await productosService.listarPorId(id_prod)
    if (producto.error) {
      return res.json({
        status: 400,
        error: producto.error
      })
    }
    const { nombre, descripcion, codigo, foto, precio, stock } = producto
    const carrito = await carritosService.agregarProducto({ nombre, descripcion, codigo, foto, precio, stock }, id)
    if (carrito.error) {
      return res.json({
        status: 400,
        error: carrito.error
      })
    }

    return res.redirect('/')
    // return res.json({
    //   status: 200,
    //   body: carrito
    // })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  login,
  getFaillogin,
  getLogout,
  getSignUp,
  postSignUp,
  getFailsignup,
  postEnviarCarrito,
  agregarProductoCarritoById
}
