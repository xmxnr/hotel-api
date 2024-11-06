const express = require('express')
const { getAllReviews, createReview, getOneReview, deleteReview, updateReview } = require('../controllers/review.controllers')
const routerReview = express.Router()

routerReview.route('/').get(getAllReviews).post(createReview)

routerReview.route('/:id').get(getOneReview).delete(deleteReview).put(updateReview)

module.exports = routerReview