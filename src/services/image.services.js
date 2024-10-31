const {image, hotel} = require("../models")

const getAllImageService = async() => {
    return image.findAll({include : hotel})
}

const createImageService = async(body) => {
    return await image.create(body)
}

const getOneImageService = async(id) => {
    return await image.findByPk(id)
}

const updateImageService = async(id, body) => {
    return await image.update(body, {where: {id}, returning: true})
}

const deleteImageService = async (id) => {
    return await image.destroy({where: {id}})
}

module.exports = {
    getAllImageService,
    createImageService,
    getOneImageService,
    updateImageService,
    deleteImageService
}