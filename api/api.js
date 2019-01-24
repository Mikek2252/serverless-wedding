const express = require('express')
const bodyParser = require('body-parser')
const http = require('serverless-http')

// TODO: set headers

// Content-Type: application/vnd.api+json
// Accept: application/vnd.api+json

const mealController = require('./controllers/meals')
const guestController = require('./controllers/guests')
const bookingController = require('./controllers/bookings')
const confirmationController = require('./controllers/confirmations')

const app = express()
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
app.get('/meals', mealController.getAll)
app.get('/meals/:id', mealController.getId)
app.get('/bookings', bookingController.getAll)
app.get('/bookings/:id', bookingController.getId)
app.patch('/bookings/:id', bookingController.patch)
app.get('/bookings/:id/guests', guestController.getByBookingId)
app.get('/guests/:id', guestController.getId)
app.patch('/guests/:id', guestController.patch)
app.get('/guests/:id/meals', mealController.getByGuestId)
app.post('/confirmations', confirmationController.post)

module.exports.handler = http(app)
