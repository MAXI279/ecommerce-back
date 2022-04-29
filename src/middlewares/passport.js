const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bCrypt = require('bcrypt')
const logger = require('../logs')
const UserDaoMongo = require('../models/daos/UsersDaoMongo')

const User = new UserDaoMongo()

const salt = () => bCrypt.genSaltSync(10)
const encrypt = (password) => bCrypt.hashSync(password, salt())
const isValidPassword = (user, password) => bCrypt.compareSync(password, user.password)

// Passport Local Strategy
passport.use('signup', new LocalStrategy({
  passReqToCallback: true
},
async (req, username, password, done) => {
  console.log(req.body)
  const newUser = {
    nombre: req.body.nombre,
    email: username,
    password: encrypt(password),
    foto: req.body.fotoId,
    direccion: req.body.direccion,
    edad: req.body.edad,
    telefono: req.body.telefono
  }

  User.guardar(newUser)
    .then((user) => {
      console.log('User registration successful!')
      return done(null, user)
    })
    .catch((error) => {
      console.log('Error siging up >>> ', error)
      return done(error)
    })
}
))

passport.use('signin', new LocalStrategy((username, password, done) => {
  User.listarPorEmail(username)
    .then((user) => {
      if (!isValidPassword(user, password)) {
        logger.warn('Invalid password')
        return done(null, false)
      };
      return done(null, user)
    })
    .catch((error) => {
      logger.warn(error.message)
      return done(error)
    })
}))

passport.serializeUser((user, done) => {
  logger.info(user)
  logger.info('Inside serializer')
  done(null, user._id)
})

passport.deserializeUser((id, done) => {
  logger.info('Inside deserializer')
  User.listarPorId(id)
    .then(user => {
      done(null, user)
    })
})

module.exports = passport
