const {booking, hotel} = require("../models")


const getAllBookingService = async (hotelId) => {
    const where = hotelId ? { hotelId } : {}
    return await booking.findAll({
        where, 
        include: [hotel]
    })

}

const createBookingService = async (body) => {
    return await booking.create(body)
}

const getOneBookingService = async (id) => {
    return await booking.findByPk(id, {include: [hotel]})
}

const updateBookingService = async (id, body) => {
    return await booking.update(body, {where: {id}, returning: true})
}

const deleteBookingService = async (id) => {
    return await booking.destroy({where: {id}})
}

module.exports = {
    getAllBookingService,
    createBookingService,
    getOneBookingService,
    updateBookingService,
    deleteBookingService
}