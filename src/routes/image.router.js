const express = require('express')
const { getAllImages, 
    createImage, 
    getOneImage, 
    updateImage, 
    deleteImage
} = require('../controllers/image.controllers')
const routerImage = express.Router()

routerImage.route('/').get(getAllImages).post(createImage)

routerImage.route('/:id').get(getOneImage).put(updateImage).delete(deleteImage)

module.exports = routerImage

