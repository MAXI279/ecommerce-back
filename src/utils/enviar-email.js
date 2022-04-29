const nodemailer = require('nodemailer')
const { nodemailerConfig } = require('../config/env.config')

const enviarEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport(nodemailerConfig)

  return transporter.sendMail({
    from: '"Webmaster" <webmaster@grupopiero.com>',
    to,
    subject,
    html
  })
}

module.exports = enviarEmail
