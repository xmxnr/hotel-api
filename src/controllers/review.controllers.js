const { getAllReviewService, createReviewService, getOneReviewService, updateReviewService, removeReviewService } = require("../services/review.services");
const catchError = require("../utils/catchError");

const getAllReviews = catchError(async (req, res) => {
    const result = await getAllReviewService()
    return res.json(result)
})

const createReview = catchError(async (req, res) => {
    const result = await createReviewService(req.body)
    return res.status(201).json(result)
})

const getOneReview = catchError(async (req, res) => {
    const {id} = req.params
    const result = await getOneReviewService(id)

    return res.status(200).json(result)
})

const updateReview = catchError(async (req, res) => {
    const {id} = req.params
    const result = await updateReviewService(id, req.body)
    if(result[0] === 0) return res.sendStatus(404)
    return res.json(result[1][0])
})

const deleteReview = catchError(async (req, res) => {
    const {id} = req.params
    const result = await removeReviewService(id)
    if(!result) return res.senStatus(204)
    return res.sendStatus(204)
})  

module.exports = {
    getAllReviews,
    createReview,
    getOneReview,
    updateReview,
    deleteReview
}