const BaseSchema = require('../../json-api/schema.base')

module.exports = new BaseSchema({
  type: 'meals',
  attributes: [
    'name'
  ]
})
