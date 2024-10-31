const { getAllImageService, createImageService, getOneImageService, updateImageService, deleteImageService } = require("../services/image.services")
const catchError = require("../utils/catchError")

const getAllImages = catchError(async (req, res) => {
    const result = await getAllImageService()
    return res.json(result)
})

const createImage = catchError(async(req, res) => {
    const result = await createImageService(req.body)
    return res.status(201).json(result)
})

const getOneImage = catchError(async (req, res) => {
    const { id } = req.params
    const result = await getOneImageService(id)
    return res.json(result)
})    

const updateImage = catchError(async (req, res) => {
    const { id } = req.params
    const result = await updateImageService(id, req.body)
    if (result[0] === 0) return res.sendStatus(404)
    return res.json(result[1][0])
})

const deleteImage = catchError(async (req, res) => {
    const { id } = req.params
    const result = await deleteImageService(id)
    if(!result) return res.sendStatus(404)
    return res.sendStatus(204)
})

module.exports = {
    getAllImages,
    createImage,
    getOneImage,
    updateImage,
    deleteImage
}