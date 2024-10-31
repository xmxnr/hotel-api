const {hotel} = require('../models')
const { loginUser } = require('./user.services')

const getAllHotelsServices = async() => {
    return hotel.findAll()
}

const createHotelsServices = async(body) => {
    return hotel.create(body)
}

const getOneHotelsServices = async(id) => {
    return await hotel.findByPk(id)
}

const updateHotelsServices = async(id, body) => {
    return await hotel.update(body, {where: {id}, returning: true})
}

const deleteHotelService = async (id) => {
    return await hotel.destroy({where : {id}})
}

module.exports = {
    getAllHotelsServices,
    createHotelsServices,
    getOneHotelsServices, 
    updateHotelsServices,
    deleteHotelService
}