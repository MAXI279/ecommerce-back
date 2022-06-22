const ProductosDaoMongo = require('../ProductosDaoMongo')
const ProductosDaoFirebase = require('../ProductosDaoFirebase')

class ProductosFactoryDAO {
  static get (tipo) {
    const tipos = {
      MONGO: new ProductosDaoMongo(),
      FIREBASE: new ProductosDaoFirebase()
    }
    return tipos[tipo]
  }
}

module.exports = ProductosFactoryDAO
