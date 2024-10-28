const { getAllCityServices, createCityService, getOneCityService, updateCityService, deleteCityService } = require('../services/city.services')
const catchError = require('../utils/catchError')
const { update, remove } = require('./user.controllers')

const getAllCity = catchError(async(req, res) => {
    const result = await getAllCityServices()
    return res.json(result)
})

const createCity = catchError(async(req, res) => {
    const result = await createCityService(req.body)
    return res.status(201).json(result)
})

const getOneCity = catchError(async(req, res) => {
    const {id} = req.params
    const result = await getOneCityService(id)
    if(!result) return res.sendStatus(404)
    return res.json(result)
})

const updateCity = catchError(async(req, res) => {
    const {id} = req.params
    const result = await updateCityService(id, req.body)
    if (result[0] === 0) return res.sendStatus(404)
    return res.json(result[1][0])
})

const removeCity = catchError(async(req, res) => {
    const {id} = req.params
    const result = await deleteCityService(id)
    if (!result) return res.sendStatus(404)
    return res.sendStatus(204)
    
})

module.exports = {
    getAllCity,
    createCity,
    getOneCity,
    updateCity,
    removeCity
}