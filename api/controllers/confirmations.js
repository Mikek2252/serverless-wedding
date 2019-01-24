const schema = require('../schemas/confirmations')
const nodemailer = require('nodemailer')
const emailConfig = require('../../mailer-config')

module.exports = {
  post (req, res) {
    const confirmation = req.body.data
    const bookingRef = schema.connection.escape(confirmation.attributes.bookingRef)
    const email = schema.connection.escape(confirmation.attributes.email)
    const query = `INSERT INTO confirmations (email, bookingRef) VALUES (${email}, ${bookingRef})`
    const transporter = nodemailer.createTransport(emailConfig)
    const mailOptions = {
      from: 'callustheparkers@gmail.com',
      to: email,
      subject: 'We look forward to seeing you!',
      text: 'We look forward to seeing you!<br>James & Stephanie'
    }

    schema.res = res
    schema.query(query, function () {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error)
        } else {
          console.log('Email sent: ' + info.response)
        }
      })
    })
  }
}
