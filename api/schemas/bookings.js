const BaseSchema = require('../../json-api/schema.base')

module.exports = new BaseSchema({
  type: 'bookings',
  attributes: [
    'bookingRef',
    'isEveningOnly'
  ],
  boolean: [
    'isEveningOnly'
  ],
  relationships: [{
    type: 'guests',
    links: {
      related: 'guests'
    }
  }]
})
