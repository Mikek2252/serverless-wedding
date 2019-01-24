const BaseSchema = require('../../json-api/schema.base')

module.exports = new BaseSchema({
  type: 'bookings',
  attributes: [
    'isEveningOnly'
  ],
  relationships: [{
    type: 'guests',
    links: {
      related: '/bookings/:id/guests'
    }
  }]
})
