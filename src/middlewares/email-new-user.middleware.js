const env = require('../config/env.config')
const enviarEmail = require('../utils/enviar-email')

const sendEmailOnNewSignUp = (req, res, next) => {
  try {
    const message = `Se ha registrado un nuevo usuario con nombre ${req.body.nombre}, vive en: ${req.body.direccion}, tiene ${req.body.edad} años y su telefono es ${req.body.telefono}`
    enviarEmail({
      to: env.EMAIL_ADMIN,
      subject: 'Nuevo Registro',
      html: `<h4> Hola admin! </h4>
      ${message}
      `
    })

    next()
  } catch (error) {
    return res.json({
      error: error,
      descripcion: 'Ha ocurrido un error al enviar notificacion, contacte a soporte'
    })
  }
}

module.exports = sendEmailOnNewSignUp
