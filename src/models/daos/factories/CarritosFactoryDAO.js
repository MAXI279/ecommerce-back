const CarritosDaoMongo = require('../CarritosDaoMongo')
const CarritosDaoFirebase = require('../CarritosDaoFirebase')

class CarritosFactoryDAO {
  static get (tipo) {
    const tipos = {
      MONGO: new CarritosDaoMongo(),
      FIREBASE: new CarritosDaoFirebase()
    }
    return tipos[tipo]
  }
}

module.exports = CarritosFactoryDAO
