const express = require('express')
const { getAllCity, createCity, getOneCity, removeCity, updateCity } = require('../controllers/city.controllers')
const { verifyJWT } = require('../utils/verifyJWT')
const routerCity = express.Router()


routerCity.route('/').get(verifyJWT, getAllCity).post(verifyJWT, createCity)

routerCity.route('/:id').get(verifyJWT, getOneCity).delete(verifyJWT, removeCity).put(verifyJWT, updateCity)

module.exports = routerCity;