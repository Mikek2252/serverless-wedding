const schema = require('../schemas/guests')

module.exports = {
  getAll (req, res) {
    schema.findAll(res)
  },
  getId (req, res) {
    schema.findBy('id', req.params.id, res, 'belongsTo')
  },
  getByBookingId (req, res) {
    schema.findBy('bookingId', req.params.id, res)
  },
  patch (req, res) {
    const guest = req.body.data
    const id = schema.connection.escape(req.params.id)
    const isComing = schema.connection.escape(guest.attributes.isComing) === 'true' ? 1 : 0
    const dietaryRequirements = schema.connection.escape(guest.attributes.dietaryRequirements)
    const mealId = guest.relationships.meal && schema.connection.escape(guest.relationships.meal.data.id)
    const mealQuery = mealId ? `, mealId = ${mealId}` : ''
    const query = `UPDATE guests SET isComing = ${isComing}, dietaryRequirements = ${dietaryRequirements}${mealQuery} WHERE id = ${id}`
    schema.res = res
    schema.query(query, function (err, result) {
      if (err) {
        res.json(err)
      } else {
        res.json(req.body)
      }
    })
  }
}
