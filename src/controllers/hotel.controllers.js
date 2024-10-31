const { getAllHotelsServices, getOneHotelsServices, updateHotelsServices, deleteHotelService, createHotelsServices } = require("../services/hotel.services");
const catchError = require("../utils/catchError");

const getAllHotel = catchError(async (req, res) => {
    const result = await getAllHotelsServices();
    return res.json(result);
})

const createHotel = catchError(async (req, res) => {
    const result = await createHotelsServices(req.body);
    return res.status(201).json(result)
})

const getOneHotel = catchError(async (req, res) => {
    const {id} = req.params 
    const result = await getOneHotelsServices(id);
    if(!result) return res.sendStatus(404);
    return res.json(result)
})

const updateHotel = catchError(async (req,res) => {
    const {id} = req.params
    const result = await updateHotelsServices(id, req.body);
    if (result[0] === 0) return res.sendStatus(404)
    return res.json(result[1][0])
})

const removeHotel = catchError(async (req, res) => {
    const {id} = req.params
    const result = await deleteHotelService(id)
    if(!result) return res.sendStatus(404)
    return res.sendStatus(204)
})

module.exports = {
    getAllHotel,
    createHotel,
    getOneHotel,
    updateHotel,
    removeHotel
}