const express = require('express')
const { 
    getAllHotel, 
    createHotel, 
    getOneHotel, 
    removeHotel, 
    updateHotel 
} = require('../controllers/hotel.controllers')
const { verifyJWT } = require('../utils/verifyJWT')
const routerHotel = express.Router()

routerHotel.route('/').get(verifyJWT, getAllHotel).post(verifyJWT, createHotel)

routerHotel.route('/:id').get(verifyJWT, getOneHotel).delete(verifyJWT, removeHotel).put(verifyJWT, updateHotel)

module.exports = routerHotel