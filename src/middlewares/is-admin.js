
const admin = true

const isAdmin = (req, res, next) => {
  return admin
    ? next()
    : res.json({
      error: -1,
      descripcion: `ruta ${req.url} método ${req.method} no autorizada`
    })
}

module.exports = isAdmin
