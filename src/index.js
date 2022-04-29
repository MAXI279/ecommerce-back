const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
const { engine } = require('express-handlebars')
const passport = require('./middlewares/passport')
const path = require('path')
const logger = require('./logs')
const rutasApi = require('./routes')
const rutasWeb = require('./routes/web.routes')
const apiErrorHandler = require('./error/api-error-handler')
const env = require('./config/env.config')

const app = express()

app.use('/public', express.static('src/public'))

app.engine('handlebars', engine({
  extname: 'hbs',
  defaultLayout: 'main.hbs',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  },
  layoutsDir: path.resolve(__dirname, './views/layouts'),
  partialsDir: path.resolve(__dirname, './views/partials')
}))
app.set('view engine', 'handlebars')
app.set('views', './src/views')

app.use(session({
  name: 'my-session',
  store: MongoStore.create({
    mongoUrl: env.MONGO_URI,
    mongoOptions: advancedOptions
  }),
  secret: 'stringUltraSecreto',
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge: 60000
  }
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/', rutasWeb)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', rutasApi)
app.use(apiErrorHandler)

app.all('*', (req, res) => {
  const respuesta = `ruta ${req.url} método ${req.method} no implementada`
  logger.warn(respuesta)
  return res.status(404).json({
    error: -2,
    descripcion: respuesta
  })
})

module.exports = app
