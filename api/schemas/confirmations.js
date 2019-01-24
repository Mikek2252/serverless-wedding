const BaseSchema = require('../../json-api/schema.base')

module.exports = new BaseSchema({
  type: 'confirmations',
  attributes: [
    'bookingRef',
    'email'
  ]
})
