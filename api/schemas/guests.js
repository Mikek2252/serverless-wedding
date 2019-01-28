const BaseSchema = require('../../json-api/schema.base')

module.exports = new BaseSchema({
  type: 'guests',
  attributes: [
    'name',
    'isComing',
    'dietaryRequirements'
  ],
  boolean: [
    'isComing'
  ],
  relationships: [{
    type: 'meals',
    name: 'meal',
    identifier: 'mealId'
  },
  {
    type: 'bookings',
    identifier: 'bookingId'
  }]
})
