const BaseSchema = require('../../json-api/schema.base')

module.exports = new BaseSchema({
  type: 'guests',
  attributes: [
    'name',
    'isComing',
    'dietaryRequirements'
  ],
  relationships: [{
    type: 'meals',
    identifier: 'mealId'
  },
  {
    type: 'bookings',
    identifier: 'bookingId'
  }]
})
