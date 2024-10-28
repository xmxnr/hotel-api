const {city} = require('../models')

const getAllCityServices = async() => {
    return city.findAll();
}

const createCityService = async(body) => {
    return await city.create(body)
}

const getOneCityService = async(id) => {
    return await city.findByPk(id)
}

const updateCityService = async(id, body) => {
    return await city.update(body, {where: {id}, returning: true})
}

const deleteCityService = async(id) => {
    return await city.destroy({where: {id}})
}

module.exports = {
    getAllCityServices,
    createCityService,
    getOneCityService,
    updateCityService,
    deleteCityService,
}