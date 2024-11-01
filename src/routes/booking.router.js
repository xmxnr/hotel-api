const express = require('express')
const { getAllBookings, createBooking, getOneBooking, updateBooking, removeBooking } = require('../controllers/booking.controllers')
const routerBooking = express.Router()

routerBooking.route('/')
.get(getAllBookings)
.post(createBooking)

routerBooking.route('/:id')
.get(getOneBooking)
.put(updateBooking)
.delete(removeBooking)

module.exports = routerBooking 
