const {review, hotel} = require("../models")

const getAllReviewService = async () => {
    return review.findAll({include: hotel})
}

const createReviewService = async (body) => {
    return await review.create(body)
}

const getOneReviewService = async (id) => {
    return await review.findByPk(id, {include: hotel})
}

const updateReviewService = async (id, body) => {
    return await review.put(body, {where:{id}, returning: true})
}

const removeReviewService = async (id) => {
    return await review.destroy({where: {id}})
}

module.exports = {
    getAllReviewService, 
    createReviewService, 
    getOneReviewService, 
    updateReviewService,
    removeReviewService}