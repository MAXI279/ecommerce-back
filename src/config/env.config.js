require('dotenv').config()

const {
  PORT,
  MONGO_URI,
  DATASOURCE,
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USR,
  EMAIL_PASS,
  EMAIL_ADMIN,
  MODO_SRV
} = process.env

module.exports = {
  PORT,
  MONGO_URI,
  DATASOURCE,
  EMAIL_ADMIN,
  MODO_SRV,
  nodemailerConfig: {
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: false,
    auth: {
      user: EMAIL_USR,
      pass: EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false,
      minVersion: 'TLSv1'
    }
  }
}
