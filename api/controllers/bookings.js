const schema = require('../schemas/bookings')

module.exports = {
  getAll (req, res) {
    if (req.query.bookingRef) {
      const bookingRef = req.query.bookingRef
      schema.findBy('bookingRef', bookingRef, res, 'belongsTo')
    } else {
      schema.findAll(res)
    }
  },
  getId (req, res) {
    schema.findBy('id', req.params.id, res, 'belongsTo')
  },
  patch (req, res) {
    const id = schema.connection.escape(req.query.id)
    const isEveningOnly = schema.connection.escape(req.query.isEveningOnly) === 'true' ? 1 : 0
    const query = `UPDATE bookings SET isEveningOnly = ${isEveningOnly} WHERE id = '${id}'`
    schema.res = res
    schema.query(query, function (err, result) {
      if (err) {
        this.res.json(err)
      } else {
        res.json(req.body)
      }
    })
  }
}
