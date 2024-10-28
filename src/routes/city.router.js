const express = require('express')
const { getAllCity, createCity, getOneCity, removeCity, updateCity } = require('../controllers/city.controllers')
const routerUser = express.Router()


routerUser.route('/').get(getAllCity).post(createCity)

routerUser.route('/:id').get(getOneCity).delete(removeCity).put(updateCity)