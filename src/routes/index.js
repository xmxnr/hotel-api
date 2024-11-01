const express = require('express');
const routerUser = require('./user.router');
const routerCity = require('./city.router');
const routerHotel = require('./hotel.router');
const routerImage = require('./image.router');
const routerBooking = require('./booking.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/users', routerUser);
router.use('/cities', routerCity);
router.use('/hotels', routerHotel)
router.use('/images', routerImage)
router.use('/bookings', routerBooking)

module.exports = router;
