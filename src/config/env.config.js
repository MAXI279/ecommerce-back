require('dotenv').config()

const env = process.env.NODE_ENV || 'development'

const development = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  DATASOURCE: process.env.DATASOURCE,
  EMAIL_ADMIN: process.env.EMAIL_ADMIN,
  MODO_SRV: process.env.MODO_SRV,
  nodemailerConfig: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USR,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false,
      minVersion: 'TLSv1'
    }
  }
}

const production = {
  PORT: process.env.PRD_PORT,
  MONGO_URI: process.env.PRD_MONGO_URI,
  DATASOURCE: process.env.PRD_DATASOURCE,
  EMAIL_ADMIN: process.env.PRD_EMAIL_ADMIN,
  MODO_SRV: process.env.PRD_MODO_SRV,
  nodemailerConfig: {
    host: process.env.PRD_EMAIL_HOST,
    port: process.env.PRD_EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.PRD_EMAIL_USR,
      pass: process.env.PRD_EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false,
      minVersion: 'TLSv1'
    }
  }
}

const config = {
  development,
  production
}

module.exports = config[env.trim()]
