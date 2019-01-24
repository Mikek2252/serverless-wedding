const schema = require('../schemas/meals')

module.exports = {
  getAll (req, res) {
    schema.findAll(res)
  },
  getId (req, res) {
    schema.findBy('id', req.params.id, res, 'belongsTo')
  },
  getByGuestId (req, res) {
    const escapedId = schema.connection.escape(req.params.id)
    const query = `SELECT guests.mealId as id, meal.name FROM guests JOIN meals ON guests.mealId = meal.id WHERE id = ${escapedId}`
    schema.res = res
    schema.query(query, 'belongsTo')
  }
}
