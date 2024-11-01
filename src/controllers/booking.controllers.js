const { getAllBookingService, createBookingService, getOneBookingService, updateBookingService, deleteBookingService } = require("../services/booking.services");
const catchError = require("../utils/catchError");

const getAllBookings = catchError(async (req, res) => {
    const {hotelId} = req.query
    const result = await getAllBookingService(hotelId)
    return res.json(result)
})

const createBooking = catchError(async (req, res) => {
    const result = await createBookingService(req.body)
    return res.status(201).json(result)
})

const getOneBooking = catchError(async (req, res) => {
    const {id} = req.params
    const result = await getOneBookingService(id)
    if(!result) return res.sendStatus(404)
    return res.json(result) 
})

const updateBooking = catchError(async (req, res) => {
    const {id} = req.params
    const result = await updateBookingService(id, req.body)
    if(result[0] === 0) return res.sendStatus(404)
    return res.json(result[1][0])
})

const removeBooking = catchError(async (req, res) => {
    const {id} = req.params
    const result = await deleteBookingService(id)
    if(!result) return res.sendStatus(404)
    return res.sendStatus(204)
})

module.exports = {
    getAllBookings,
    createBooking,
    getOneBooking,
    updateBooking,
    removeBooking
}